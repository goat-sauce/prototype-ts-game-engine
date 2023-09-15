import { Actor } from '../entities/Actor'
import { DisplayObject } from 'pixi.js'
import { GameObject } from '../classes/GameObject'
import { Vector2 } from '@shared/helpers'
import { NpcState, PlayerState } from 'preload/game/types'

export class Player extends GameObject<PlayerState> {
    public tags: string[] = ['player']
    public actor: Actor = new Actor({
        spritesheet: 'villager-1',
        spawn: this.state.bag.spawn,
        ref: this.ref,
        animation: this.state.bag.animation
    })

    public async render(): Promise<DisplayObject> {
        this.actor.animations.setActive(this.state.bag.animation)
        this.position = this.actor.position(Vector2.convert(this.actor.physics.body.position))
        return this.actor.animations.current
    }

    public async interact(interaction: GameObject<NpcState>): Promise<void> {
        interaction.state.set({ running: true })
    }
}
