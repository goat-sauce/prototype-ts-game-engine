import { Actor } from '../entities/Actor'
import { DisplayObject } from 'pixi.js'
import { Task } from '../abstract/Task'
import { PlayerState } from 'tasks/types'
import { Vector2 } from '@package/helpers'

export class Npc extends Task<PlayerState> {
    public actor: Actor = new Actor('villager', new Vector2(3, 0))

    public async render(): Promise<DisplayObject> {
        this.actor.animations.set(this.state.bag.animation)
        this.position = this.actor.position(Vector2.convert(this.actor.physics.body.position))
        return this.actor.animations.active
    }
}
