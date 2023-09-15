import { Actor } from '../entities/Actor'
import { DisplayObject } from 'pixi.js'
import { GameObject } from '../abstract/GameObject'
import { Vector2 } from '@shared/helpers'
import { NpcState } from 'preload/tasks/types'

export class Npc extends GameObject<NpcState> {
    public actor: Actor = new Actor({
        spritesheet: 'faldyr',
        spawn: new Vector2(0, 4),
        static: true,
        zone: {
            radius: 50
        }
    })

    public constructor(state: NpcState) {
        super(state)
    }

    public async render(): Promise<DisplayObject> {
        this.actor.animations.set(this.state.bag.animation)
        this.position = this.actor.position(Vector2.convert(this.actor.physics.body.position))
        return this.actor.animations.active
    }
}
