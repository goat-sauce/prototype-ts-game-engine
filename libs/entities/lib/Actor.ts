import { AnimatedSprite, Spritesheet } from 'pixi.js'

export class Actor {
    public animations: Record<string, AnimatedSprite> = {}

    public constructor(spritesheet: Spritesheet) {
        this.animations = this.getAnimations(spritesheet)
    }

    public getAnimations(spritesheet: Spritesheet): Record<string, AnimatedSprite> {
        const sprites: Record<string, AnimatedSprite> = {}

        for (const [key, animation] of Object.entries(spritesheet.animations)) {
            sprites[key] = new AnimatedSprite(animation)
        }

        return sprites
    }

    public setAnimation(key: string): AnimatedSprite {
        const current = this.animations[key]

        for (const animation of Object.values(this.animations)) {
            animation.visible = false
        }

        current.visible = true

        return current
    }
}
