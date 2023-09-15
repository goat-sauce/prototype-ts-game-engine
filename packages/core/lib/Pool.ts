import { Container, Renderer } from 'pixi.js'
import { Client } from './Client'
import { Logger } from './Logger'
import { Vector2 } from './Vector2'

export class Pool {
  public workers: Worker[]
  private logger: Logger

  constructor() {
    this.logger = new Logger()
    this.workers = []
  }

  public async open(size: number) {
    for (let i = 0; i < size; i++) {
      this.workers.push(await this.employ())
    }
  }

  private employ(): Promise<Worker> {
    return new Promise((resolve, reject) => {
      const worker = new Worker('run.worker.bundle.js')
      worker.onerror = (event) => reject(event)
      worker.onmessage = () => resolve(worker)
    })
  }

  public terminate() {
    for (const worker of this.workers) {
      worker.terminate()
    }
  }
}
