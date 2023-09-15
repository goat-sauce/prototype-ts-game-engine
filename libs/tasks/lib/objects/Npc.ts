import { Actor } from '../entities/Actor'
import { DisplayObject } from 'pixi.js'
import { Task } from '../abstract/Task'
import { PlayerState } from 'tasks/types'
import { Client } from '@package/core'
import { Vector2 } from '@package/helpers'

export class Npc extends Task<PlayerState> {
    public tags: string[] = ['player']
    public player: Actor

    public constructor(state: PlayerState) {
        super(state)
        this.player = new Actor('villager', new Vector2(64, 64))
        Client.Engine.stage.center(state.position)
    }

    public async render(): Promise<DisplayObject> {
        this.player.setAnimation(this.state.bag.animation)
        this.player.animation.animationSpeed = 0.1
        this.player.animation.play()
        this.player.position(Vector2.convert(this.player.body.position, true))
        return this.player.animation
    }
}
