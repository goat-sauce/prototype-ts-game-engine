import { Actor } from '../entities/Actor'
import { DisplayObject } from 'pixi.js'
import { GameObject } from '../abstract/GameObject'
import { Vector2 } from '@shared/helpers'
import { PlayerState } from 'preload/tasks/types'

export class Player extends GameObject<PlayerState> {
    public tags: string[] = ['player']
    public actor: Actor = new Actor({
        spritesheet: 'villager-1',
        spawn: this.state.bag.spawn
    })

    public async render(): Promise<DisplayObject> {
        this.actor.animations.set(this.state.bag.animation)
        this.position = this.actor.position(Vector2.convert(this.actor.physics.body.position))
        return this.actor.animations.active
    }
}
