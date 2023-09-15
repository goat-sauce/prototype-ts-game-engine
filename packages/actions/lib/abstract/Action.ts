import { Client } from '@package/core'
import { ActionOptions } from 'actions/types'
import { DisplayObject } from 'pixi.js'

export abstract class Action {
  public options: ActionOptions

  constructor(options?: ActionOptions) {
    this.options = options
  }

  public complete(): DisplayObject {
    return Client.stage
  }
}
