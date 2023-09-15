import { Ticker } from 'pixi.js'
import { Errors } from './Errors'
import { Codes, Keyboard } from '@preload/keyboard'
import { Debug } from '@shared/debug'
import { renderer } from '@shared/config'
import { Channels } from '@shared/channels'
import { Layers } from './members/Layers'
import { Physics } from './members/Physics'
import { Assets } from './members/Assets'
import { Registry } from './members/Registry'
import { IPC } from './members/IPC'
import { Runner } from './members/Runner'
import { Renderer } from './members/Renderer'
import { Queue } from './members/Queue'
import { Scene } from 'preload/game/lib/classes/Scene'

export class Engine {
    public static layers: Layers = new Layers()
    public static renderer: Renderer = new Renderer()
    public static physics: Physics = new Physics()
    public static ticker: Ticker = new Ticker()
    public static scene: Scene = new Scene()
    public static assets: Assets = new Assets()
    public static registry: Registry = new Registry()
    public static IPC: IPC = new IPC()
    public static runner: Runner = new Runner()
    public static keyboard: Keyboard = new Keyboard()
    public static queue: Queue = new Queue()
    public static view: HTMLCanvasElement = Engine.renderer.view as unknown as HTMLCanvasElement

    public static async setup(): Promise<void> {
        try {
            renderer.settings()
            Engine.resize()
            await Engine.assets.load()
            await Engine.IPC.invoke(Channels.game.load)
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
        Engine.physics.world.step(1 / Engine.ticker.FPS, Engine.ticker.deltaMS, 10)
        Engine.renderer.render(Engine.layers.container)
        Engine.layers.stage.render()

        if (Codes.set.size > 0) {
            Engine.keyboard.handler()
        }

        if (Engine.queue.gameObjects.size > 0) {
            Engine.runner.setup([...Engine.queue.gameObjects.values()])
            Engine.queue.gameObjects = new Set()
        }

        if (Engine.registry.gameObjects.store.size > 0) {
            Engine.runner.render([...Engine.registry.gameObjects.store.values()])
        }

        if (Physics.interaction.size > 0) {
            Engine.runner.conductor()
        }
    }
}
