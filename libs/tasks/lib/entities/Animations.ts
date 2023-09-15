import { Vector2 } from '@package/helpers';
import { AnimatedSprite, Spritesheet } from 'pixi.js';

export class Animations {
    public map: Map<string, AnimatedSprite> = new Map()
    public active: AnimatedSprite
    private spritesheet: Spritesheet
    private spawn: Vector2

    public constructor(spritesheet: Spritesheet, spawn: Vector2) {
        this.spawn = spawn;
        this.spritesheet = spritesheet
        this.load()
        this.active = this.get('idle')
    }

    public load(): void {
        for (const key of Object.keys(this.spritesheet.animations)) {
            const animation = new AnimatedSprite(this.spritesheet.animations[key])
            animation.anchor.set(0.5, 0.5)
            animation.visible = false
            animation.animationSpeed = 0.1
            animation.position = Vector2.normalize(this.spawn)
            this.map.set(key, animation)
        }
    }

    public get(key: string): AnimatedSprite {
        const sprite = this.map.get(key)
        if (sprite) return sprite
        return new AnimatedSprite(this.spritesheet.animations['idle'])
    }

    public set(key: string): void {
        this.active.visible = false;
        const animation = this.map.get(key)

        if (animation) {
            animation.visible = true
            animation.play()
            this.active = animation
        }
    }
}
