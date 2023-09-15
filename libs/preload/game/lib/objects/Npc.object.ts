import { Actor } from '../entities/Actor'
import { DisplayObject } from 'pixi.js'
import { GameObject } from '../classes/GameObject'
import { Vector2 } from '@shared/helpers'
import { NpcState } from 'preload/game/types'

export class Npc extends GameObject<NpcState> {
    public actor: Actor = new Actor({
        spritesheet: 'faldyr',
        spawn: new Vector2(0, 4),
        static: true,
        ref: this.ref,
        animation: this.state.bag.animation,
        zone: {
            radius: 50
        }
    })

    public constructor(state: NpcState) {
        super(state)
    }

    public async render(): Promise<DisplayObject> {
        this.actor.animations.setActive(this.state.bag.animation)
        this.position = this.actor.position(Vector2.convert(this.actor.physics.body.position))
        if (this.state.bag.running) this.actor.physics.body.velocity[1] = -30
        return this.actor.animations.current
    }
}
