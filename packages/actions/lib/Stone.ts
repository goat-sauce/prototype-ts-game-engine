import { Client } from '@package/core'
import { Vector2 } from '@package/utils'
import { Prop } from 'entities'
import { Action } from './abstract/Action'

export class Stone extends Action {
    public override complete() {
        const stone = new Prop({ position: new Vector2(3, 3) })
        return Client.stage.addChild(stone.sprite)
    }
}
