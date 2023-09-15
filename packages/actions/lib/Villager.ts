import { Client } from '@package/core'
import { Vector2 } from '@package/utils'
import { Actor } from 'entities'
import { Action } from './abstract/Action'
import { ActionOptions } from 'actions/types'

interface VillagerOptions extends ActionOptions {
    position: Vector2
}

export class Villager extends Action {
    public options: VillagerOptions

    constructor(options?: VillagerOptions) {
        super()
        this.options = options ? options : null
    }

    public override complete(options: VillagerOptions) {
        const villager = new Actor({
            position: this.options ? this.options.position : new Vector2(0, 0),
            texture: 'assets/sprites/actors/Villager.png',
            width: 18,
            height: 19
        })

        console.log(villager, 'villager')

        return Client.stage.addChild(villager.sprite)
    }
}
