import atlas from '../../../build/assets/sprites/actors/villager/atlas.json'
import { Vector2 } from '@package/utils'
import { Actor } from 'entities'
import { Task } from './abstract/Task'
import { AnimatedSprite } from 'pixi.js'

export class Villager extends Task {
    public override async complete() {
        const villager = new Actor(atlas)
        await villager.spritesheet.parse()
        villager.animation = new AnimatedSprite(villager.spritesheet.animations.spin)
        villager.animation.position = new Vector2(2, 2)
        villager.animation.width = 64
        villager.animation.height = 64
        villager.animation.animationSpeed = 0.05
        villager.animation.play()
        return villager.animation
    }
}
