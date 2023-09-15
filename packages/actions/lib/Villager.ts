import { Client } from '@package/core'
import { Vector2 } from '@package/utils'
import { Actor, Prop } from 'entities'
import { Action } from './abstract/Action'
import { ActionOptions } from 'actions/types'

import { Easing, Tween } from '@tweenjs/tween.js'
import { Debug } from '@package/debug'
import { Text } from 'pixi.js'

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
            width: 18,
            height: 19
        })
        // const tween = new Tween(position);
        // tween.to({ y: 0, x: 5 * 32 }, 2000)
        // tween.repeat(Infinity)
        // tween.yoyo(true)
        // // tween.easing(Easing.Bounce.In)
        // tween.onUpdate(function (object) {
        //     villager.animation.position = object;
        // })
        // tween.onComplete(function (object) {
        //     console.log(object)
        // })
        // Client.tweens.push(tween.start());
        villager.animation.width = 32;
        villager.animation.height = 32;
        villager.animation.animationSpeed = 0.05;
        villager.animation.play()
        Client.stage.addChild(villager.animation)
    }
}


function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}