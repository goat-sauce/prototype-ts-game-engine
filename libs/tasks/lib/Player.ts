import { Vector2 } from 'entities'
import { Task } from './abstract/Task'
import { AnimatedSprite, Container } from 'pixi.js'
import { Client } from '@package/core'

export class Player extends Task<{ animation: string, position: Vector2 }> {
    public tags: string[] = ['player']
    public spritesheet = Client.Engine.atlases.spritesheets.get('villager');
    public player: Record<string, AnimatedSprite> = {
        idle: new AnimatedSprite(this.spritesheet.animations['idle']),
        up: new AnimatedSprite(this.spritesheet.animations['up']),
        down: new AnimatedSprite(this.spritesheet.animations['down']),
        left: new AnimatedSprite(this.spritesheet.animations['left']),
        right: new AnimatedSprite(this.spritesheet.animations['right'])
    }

    public animation(animation: string) {
        for (const anim of Object.keys(this.player)) {
            const sprite = this.player[anim];
            sprite.visible = false;
        }

        return this.player[animation];
    }

    public async render() {
        const player = this.animation(this.state.obj.animation);
        player.visible = true;
        player.position = this.state.obj.position
        player.animationSpeed = 0.1
        player.play()
        return player;
    }
}
