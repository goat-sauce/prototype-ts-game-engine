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
        this.create()

        return Client.stage
    }

    public create() {
        const position = this.options ? this.options.position : new Vector2(0, 0);
        const villager = new Actor({
            position: position,
            texture: 'assets/sprites/actors/Villager.png',
            width: 64,
            height: 64
        })
        villager.animation.width = 64;
        villager.animation.height = 64;
        villager.animation.animationSpeed = 0.05;
        villager.animation.play()
        Client.actors.push(villager);
        Client.stage.addChild(villager.animation)
    }
}


function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}