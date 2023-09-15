import { Renderer, Ticker } from 'pixi.js'
import { Codes, Keyboard } from '@package/keyboard'
import { Memory } from '@package/memory'
import { Debug } from '@package/debug'
import { Task } from '@package/tasks'
import { Runner } from './classes/Runner'
import { Assets } from './classes/Assets'
import { Stage } from './classes/Stage'
import { ipcRenderer } from 'electron'
import { IPC } from './classes/IPC'
import { Registry } from './classes/Registry'
import { RegisterTask, Size } from 'core/types'
import { EventHelper } from '@package/helpers'
import { Atlas } from './classes/Atlas'
import { Errors } from './Errors'
import { config } from '@package/config'
import { Tilemaps } from './classes/Tilemaps'

export namespace Client {
    export enum Mode {
        Play = 'play',
        Debug = 'debug'
    }

    export const mode: { current: Mode } = {
        current: Mode.Play
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
        public static keyboard: Keyboard = new Keyboard()
        public static tilemaps: Tilemaps = new Tilemaps()
        public static view: HTMLCanvasElement = Engine.renderer.view as unknown as HTMLCanvasElement

        public static size(): Size {
            return {
                width: config.window.size.x,
                height: config.window.size.y
            }
        }

        public static async setup(): Promise<void> {
            try {
                await ipcRenderer.invoke('game:create')
                await Engine.assets.load()
                await Engine.atlases.load()
                await Engine.tilemaps.load()
                Engine.memorize()
                Engine.eventListeners()
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

            if (Codes.set.size > 0) {
                Engine.keyboard.handler()
            }

            if (tasks && tasks.length > 0) {
                Engine.memory.set<Task<unknown>[]>('tasks', [])
                Engine.runner.work(tasks)
            }
        }
    }
}
