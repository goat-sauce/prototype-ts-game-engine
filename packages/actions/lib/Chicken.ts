import { Client } from '@package/core'
import { Vector2 } from '@package/utils'
import { ActionOptions } from 'actions/types'
import { Prop } from 'entities'
import { Action } from './abstract/Action'

interface ChickenOptions extends ActionOptions {
    position: Vector2
}
export class Chicken extends Action {
    public options: ChickenOptions

    constructor(options?: ChickenOptions) {
        super()
        this.options = options ? options : null
    }

    public override complete() {
        const position = this.options ? this.options.position : new Vector2(0, 0);
        const chicken = new Prop({
            filename: 'assets/sprites/props/Chicken.png',
            position: position
        })

        return Client.stage.addChild(chicken.sprite)
    }
}
