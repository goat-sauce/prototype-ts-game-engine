import { Keyboard } from '@package/keyboard'
import { DisplayObject, Renderer, Ticker } from 'pixi.js'
import { Painter, Runner } from './classes/Runner'
import { Pool } from './classes/Pool'
import { Assets } from './classes/Assets'
import { Memory } from '@package/memory'
import { Task } from '@package/tasks'
import { Chunk } from '../../../app/main/classes/Chunk'
import { Vector2 } from '@package/entities'
import { Stage } from './classes/Stage'
import { ipcRenderer } from 'electron'
import { config } from '@package/config'
import { Atlas } from '@package/atlas'

export type RegisterTask<S extends {}> = {
    task: Task<S>,
    rendered: DisplayObject
}

class Registry extends Memory {
    public override store: Map<string, RegisterTask<any>> = new Map()

    public search<S extends {}>(tag: string): RegisterTask<S> {
        return Array.from(this.store.values()).find((register: RegisterTask<S>) => {
            if (register.task.tags.includes(tag)) return register;
        })
    }
}


export namespace Client {
    export const Mode = {
        Play: 'play',
        Placement: 'placement',
        Overlay: 'overlay'
    }

    export class Engine {
        public static renderer: Renderer = new Renderer(Engine.size())
        public static ticker: Ticker = new Ticker()
        public static stage: Stage = new Stage()
        public static runner: Runner = new Runner()
        public static painter: Painter = new Painter()
        public static keyboard: Keyboard = new Keyboard()
        public static pool: Pool = new Pool()
        public static assets: Assets = new Assets()
        public static atlases: Atlas = new Atlas()
        public static state: Memory = new Memory()
        public static registry: Registry = new Registry()
        public static view: HTMLCanvasElement = Engine.renderer.view as unknown as HTMLCanvasElement

        public static size() {
            return {
                width: window.innerWidth,
                height: window.innerHeight
            }
        }

        public static async setup() {
            await ipcRenderer.invoke('game:create')
            await Engine.assets.load()
            await Engine.atlases.load()
            Engine.state.set<Task<unknown>[]>('tasks', [])
            Engine.state.set<Record<string, Chunk>>('chunks', {})
            Engine.state.set<Vector2>('activeChunkPosition', config.spawn)
            Engine.state.set<number>('timer', Engine.ticker.deltaMS)
            Engine.state.set<number>('frame', 0)
            Engine.eventListeners()
            Engine.stage.debug()
            Engine.start()
        }

        public static start() {
            document.body.append(Engine.view)
        }

        public static async chunk(event: CustomEvent<{ position: boolean }>) {
            const chunks = await ipcRenderer.invoke('chunk:get', { position: event.detail.position })
            Engine.state.set('activeChunkPosition', event.detail.position)
            Engine.state.set<Record<string, Chunk>>('chunks', chunks)
        }

        private static isCustomEvent(event: Event): event is CustomEvent {
            return 'detail' in event;
        }

        private static eventListeners() {
            document.addEventListener('keydown', Engine.keyboard.add)
            document.addEventListener('keyup', Engine.keyboard.remove)
            document.addEventListener('chunk:update', Engine.chunk)
            document.addEventListener('state:update', Engine.stateUpdate)
            // window.addEventListener('resize', Engine.resize)
        }

        public static async stateUpdate(event: Event) {
            if (Client.Engine.isCustomEvent(event)) {
                const registry: RegisterTask<{}> | null = Client.Engine.registry.get(event.detail.ref)

                if (registry) {
                    const rendered = await registry.task.render();
                    Client.Engine.stage.container.addChild(rendered)
                }
            }
        }

        public static resize() {
            const size = Engine.size()
            Engine.view.height = size.height
            Engine.view.width = size.width
            Engine.renderer.resize(size.width, size.height)
        }

        public static fps() {
            const timer = Engine.state.get<number>('timer')
            const frame = Engine.state.get<number>('frame')
            if (timer) Engine.state.set('timer', timer + Engine.ticker.deltaMS)
            if (frame) Engine.state.set('frame', frame + 1)
            if (timer && frame) return Math.floor(frame / new Date(timer).getSeconds())
            return null;
        }

        public static async update() {
            const tasks = Engine.state.get<Task<unknown>[]>('tasks')

            Engine.renderer.render(Engine.stage.container)

            if (Keyboard.codes.size > 0) {
                Engine.keyboard.handler(Keyboard.codes)
            }

            if (tasks.length > 0) {
                Engine.state.set<Task<unknown>[]>('tasks', [])
                Engine.runner.work(tasks)
            }
        }
    }
}
