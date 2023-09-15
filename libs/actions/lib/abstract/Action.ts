import { Client } from '@package/core'
import { ActionOptions } from 'actions/types'
import { DisplayObject } from 'pixi.js'

export abstract class Action {
    public complete(options?: ActionOptions): DisplayObject {
        return Client.stage
    }
}
