import { Client } from '@package/core'
import { Actor } from './Actor'
import { Container, DisplayObject, Spritesheet } from 'pixi.js'
import { Task } from './abstract/Task'
import { PlayerState } from 'tasks/types'
import { Node, Vector2 } from '@package/entities'

export class Player extends Task<PlayerState> {
    public tags: string[] = ['player']
    public player: Actor | null
    public spritesheet: Spritesheet | undefined

    public constructor(state: PlayerState) {
        super(state)
        this.spritesheet = Client.Engine.atlases.spritesheets.get('villager')
        this.player = this.spritesheet ? new Actor(this.spritesheet) : null
        const node = new Node(new Vector2(0, 0))
        console.log(node)
    }

    public async render(): Promise<DisplayObject> {
        if (this.player && this.state.bag) {
            const sprite = this.player.setAnimation(this.state.bag.animation)
            sprite.visible = true
            sprite.position = this.state.bag.position
            sprite.animationSpeed = 0.1
            sprite.play()
            return sprite
        }

        return new Container()
    }
}
