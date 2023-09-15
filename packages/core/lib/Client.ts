import { Keyboard } from '@package/keyboard'
import { Action } from '@package/actions'
import { Assets, Container, Renderer, Ticker } from 'pixi.js'
import { Runner } from './classes/Runner'
import { Pool } from './classes/Pool'
import { Stage } from 'core/types'
import { Tween } from '@tweenjs/tween.js'

export class Client {
    public static renderer: Renderer = new Renderer({
        width: window.innerWidth,
        height: window.innerHeight,
        resolution: 2
    })
    public static ticker: Ticker = new Ticker()
    public static stage: Stage = new Container()
    public static stagehand: Runner = new Runner()
    public static keyboard: Keyboard = new Keyboard()
    public static pool: Pool = new Pool()
    public static view = Client.renderer.view
    public static queue: Action[] = []
    public static tweens: Tween<{}>[] = []

    public static async setup() {
        document.body.append(Client.view as unknown as HTMLCanvasElement)
        document.addEventListener('keydown', Client.keyboard.add)
        document.addEventListener('keyup', Client.keyboard.remove)
        window.addEventListener('resize', Client.resize)
        await Assets.load('assets/sprites/props/Chicken.png')
        await Assets.load('assets/sprites/actors/Idle1.png')
        await Assets.load('assets/sprites/actors/Idle2.png')
    }

    public static resize() {
        Client.view.height = window.innerHeight
        Client.view.width = window.innerWidth
        Client.renderer.resize(window.innerWidth, window.innerHeight)
    }

    public static state() {
        Client.renderer.render(Client.stage)
        Client.keyboard.handler(this, Keyboard.codes)

        if (Client.queue.length > 0) {
            Client.stagehand.work(Client.queue)
            Client.queue = []
        }

        if (Client.tweens.length > 0) {
            for (const tween of Client.tweens) {
                tween.update()
            }
            // Client.tweens = []
        }
    }
}
