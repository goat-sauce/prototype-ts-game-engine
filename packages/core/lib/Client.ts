import { Keyboard } from '@package/keyboard'
import { Action } from '@package/actions'
import { Container, Renderer, Ticker } from 'pixi.js'
import { Runner } from './classes/Runner'
import { Pool } from './classes/Pool'
import { Stage } from 'core/types'

export class Client {
  public static renderer: Renderer = new Renderer({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  public static ticker: Ticker = new Ticker()
  public static stage: Stage = new Container()
  public static stagehand: Runner = new Runner()
  public static keyboard: Keyboard = new Keyboard()
  public static pool: Pool = new Pool()
  public static view = Client.renderer.view
  public static queue: Action[] = []

  public static async setup() {
    document.body.append((Client.view as unknown) as HTMLCanvasElement)
    document.addEventListener('keydown', Client.keyboard.add)
    document.addEventListener('keyup', Client.keyboard.remove)
    window.addEventListener('resize', Client.resize)
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
      console.log(Client.stage)
      Client.stagehand.work(Client.queue)
      Client.queue = []
    }
  }
}
