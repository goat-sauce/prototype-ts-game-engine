import { Container, Renderer, Ticker } from 'pixi.js'
import { Stagehand } from './Stagehand'
import { Keyboard } from '@package/keyboard'
import { config } from '@package/config'
import { Job } from '@package/actions'
import { Pool } from './Pool'

config.renderer()

export class Client {
  public static renderer: Renderer = new Renderer({ width: 1280, height: 720 })
  public static ticker: Ticker = new Ticker()
  public static stage: Container = new Container()
  public static stagehand: Stagehand = new Stagehand()
  public static keyboard: Keyboard = new Keyboard()
  public static pool: Pool = new Pool()
  public static view = Client.renderer.view
  public static queue: Job[] = []

  public static async setup() {
    document.body.append((Client.view as unknown) as HTMLCanvasElement)
    document.addEventListener('keydown', Client.keyboard.add)
    document.addEventListener('keyup', Client.keyboard.remove)
  }

  public static resize() {
    Client.view.height = window.innerHeight
    Client.view.width = window.innerWidth
  }

  public static state() {
    Client.renderer.render(Client.stage)
    Client.keyboard.handler(this, Keyboard.codes)

    if (Client.queue.length > 0) {
      console.log(Client.stage)
      Client.stagehand.work(Client.queue)
      Client.queue = []
    }
  }
}
