import { Actor } from '../entities/Actor'
import { Container, DisplayObject } from 'pixi.js'
import { Task } from '../abstract/Task'
import { PlayerState } from 'tasks/types'
import { Client } from '@package/core'

export class Player extends Task<PlayerState> {
    public tags: string[] = ['player']
    public player: Actor | null

    public constructor(state: PlayerState) {
        super(state)
        this.player = new Actor('villager')
        Client.Engine.stage.center(state.position)
    }

    public async render(): Promise<DisplayObject> {
        if (this.player && this.state.bag) {
            const sprite = this.player.setAnimation(this.state.bag.animation)
            sprite.visible = true
            sprite.position = this.state.bag.position
            sprite.animationSpeed = 0.1
            sprite.anchor.set(0.5)
            sprite.play()
            return sprite
        }

        return new Container()
    }
}
