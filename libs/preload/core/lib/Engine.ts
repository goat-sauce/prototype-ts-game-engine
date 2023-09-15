import { Ticker } from 'pixi.js'
import { Errors } from './Errors'
import { GameObject } from '@preload/tasks'
import { Codes, Keyboard } from '@preload/keyboard'
import { RegisterGameObject } from 'preload/core/types'
import { Memory } from '@shared/memory'
import { Debug } from '@shared/debug'
import { renderer } from '@shared/config'
import { Channels } from '@shared/channels'
import { Runner } from './classes/Runner'
import { Stage } from './classes/Stage'
import { IPC } from './classes/IPC'
import { Registry } from './classes/Registry'
import { Assets } from './classes/Assets'
import { Physics } from './classes/Physics'
import { Renderer } from './classes/Renderer'

export class Engine {
    public static stage: Stage = new Stage()
    public static renderer: Renderer = new Renderer()
    public static physics: Physics = new Physics()
    public static ticker: Ticker = new Ticker()
    public static assets: Assets = new Assets()
    public static registry: Registry = new Registry()
    public static memory: Memory = new Memory()
    public static IPC: IPC = new IPC()
    public static runner: Runner = new Runner()
    public static keyboard: Keyboard = new Keyboard()
    public static view: HTMLCanvasElement = Engine.renderer.view as unknown as HTMLCanvasElement

    public static async setup(): Promise<void> {
        try {
            Engine.resize()
            renderer.settings()
            await Engine.IPC.invoke(Channels.game.load)
            await Engine.assets.load()
            Engine.memory.set<GameObject<unknown>[]>('tasks', [])
            document.body.append(Engine.view)
        } catch (error) {
            Debug.logger.error(error, Errors.FailedToSetup)
        }
    }

    public static resize(): void {
        const size = Engine.renderer.size()
        Engine.view.height = size.height
        Engine.view.width = size.width
        Engine.renderer.resize(size.width, size.height)
    }

    public static async render(): Promise<void> {
        const tasks = Engine.memory.get<GameObject<any>[]>('tasks')

        Engine.stage.render()
        Engine.physics.world.step(1 / Engine.ticker.FPS, Engine.ticker.deltaMS, 10)
        Engine.renderer.render(Engine.stage.container)

        if (Codes.set.size > 0) {
            Engine.keyboard.handler()
        }

        if (Engine.registry.store.size > 0) {
            Engine.runner.render([...Engine.registry.store.values()].map((registry: RegisterGameObject<any, any>): GameObject<any> => {
                return registry.task
            }))
        }

        if (tasks && tasks.length > 0) {
            Engine.memory.set<GameObject<any>[]>('tasks', [])
            Engine.runner.setup(tasks)
        }
    }
}
