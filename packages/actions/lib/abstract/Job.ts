import { Client } from '@package/core'
import { DisplayObject, FederatedPointerEvent } from 'pixi.js'

type JobOptions = {
  event: FederatedPointerEvent
}

export abstract class Job {
  public options: JobOptions

  constructor(options?: JobOptions) {
    this.options = options
  }

  public complete(): DisplayObject {
    return Client.stage
  }
}
