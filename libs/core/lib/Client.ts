import { Keyboard } from '@package/keyboard'
import { Renderer, Ticker } from 'pixi.js'
import { Runner } from './classes/Runner'
import { Assets } from './classes/Assets'
import { Memory } from '@package/memory'
import { Task } from '@package/tasks'
import { Stage } from './classes/Stage'
import { ipcRenderer } from 'electron'
import { IPC } from './classes/IPC'
import { Registry } from './classes/Registry'
import { RegisterTask, Size } from 'core/types'
import { Painter } from './classes/Painter'
import { EventHelper } from '@package/helpers'
import { Atlas } from './classes/Atlas'
import { Debug } from '@package/debug'
import { Errors } from './Errors'

export namespace Client {
    export enum Mode {
        Play = 'play',
        Placement = 'placement',
        Overlay = 'overlay'
    }

    export class Engine {
        public static renderer: Renderer = new Renderer(Engine.size())
        public static ticker: Ticker = new Ticker()
        public static stage: Stage = new Stage()
        public static memory: Memory = new Memory()
        public static IPC: IPC = new IPC()
        public static registry: Registry = new Registry()
        public static assets: Assets = new Assets()
        public static atlases: Atlas = new Atlas()
        public static runner: Runner = new Runner()
        public static painter: Painter = new Painter()
        public static keyboard: Keyboard = new Keyboard()
        public static view: HTMLCanvasElement = Engine.renderer.view as unknown as HTMLCanvasElement

        public static size(): Size {
            return {
                width: window.innerWidth,
                height: window.innerHeight
            }
        }

        public static async setup(): Promise<void> {
            try {
                await ipcRenderer.invoke('game:create')
                await Engine.assets.load()
                await Engine.atlases.load()
                Engine.memorize()
                Engine.eventListeners()
                Engine.stage.debug()
                Engine.start()
            } catch (error) {
                Debug.logger.error(error, Errors.FailedToSetup)
            }
        }

        public static memorize(): void {
            Engine.memory.set<Task<unknown>[]>('tasks', [])
        }

        public static start(): void {
            document.body.append(Engine.view)
        }

        private static eventListeners(): void {
            document.addEventListener('keydown', Engine.keyboard.add)
            document.addEventListener('keyup', Engine.keyboard.remove)
            document.addEventListener('state:update', Engine.state)
        }

        public static async state(event: Event): Promise<void> {
            if (EventHelper.isCustom<{ ref: string }>(event)) {
                const registry: RegisterTask<{}> | null = Client.Engine.registry.get(event.detail.ref)

                if (registry) {
                    const rendered = await registry.task.render()
                    Client.Engine.stage.container.addChild(rendered)
                }
            }
        }

        public static resize(): void {
            const size = Engine.size()
            Engine.view.height = size.height
            Engine.view.width = size.width
            Engine.renderer.resize(size.width, size.height)
        }

        public static async update(): Promise<void> {
            const tasks = Engine.memory.get<Task<unknown>[]>('tasks')

            Engine.renderer.render(Engine.stage.container)

            if (Keyboard.codes.size > 0) {
                Engine.keyboard.handler(Keyboard.codes)
            }

            if (tasks && tasks.length > 0) {
                Engine.memory.set<Task<unknown>[]>('tasks', [])
                Engine.runner.work(tasks)
            }
        }
    }
}
