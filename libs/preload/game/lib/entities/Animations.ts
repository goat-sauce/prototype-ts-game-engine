import { Engine } from '@preload/core'
import { Debug } from '@shared/debug'
import { Vector2 } from '@shared/helpers'
import { AnimatedSprite, Spritesheet } from 'pixi.js'

const Errors = {
    NoAnimatedSpriteFound: 'Couldn\'t find the the animated sprite, returned a default instead.'
}

export class Animations {
    public map: Map<string, AnimatedSprite> = new Map()
    public current: AnimatedSprite
    private spritesheet: Spritesheet
    private spawn: Vector2

    public constructor(spritesheet: Spritesheet, spawn: Vector2, defaultAnimation: string) {
        this.spritesheet = spritesheet
        this.spawn = spawn
        this.load(defaultAnimation)
        this.current = this.get(defaultAnimation)
    }

    public load(defaultAnimation: string): void {
        for (const key of Object.keys(this.spritesheet.animations)) {
            const isDefault = defaultAnimation === key
            const animation = this.create(key, isDefault)
            this.map.set(key, animation)
            Engine.runner.inject('stage', animation)
        }
    }

    public create(key: string, isDefault: boolean): AnimatedSprite {
        const animation = new AnimatedSprite(this.spritesheet.animations[key])
        animation.zIndex = 100
        animation.visible = isDefault
        animation.anchor.set(0.5, 0.5)
        animation.animationSpeed = 0.1
        animation.play()
        animation.position = Vector2.normalize(this.spawn)
        return animation
    }

    public get(key: string): AnimatedSprite {
        try {
            const sprite = this.map.get(key)
            if (sprite) return sprite
            throw Errors.NoAnimatedSpriteFound
        } catch (error) {
            Debug.logger.error(error)
            return new AnimatedSprite(this.spritesheet.animations['default'])
        }
    }

    public setActive(key: string): AnimatedSprite {
        const animation = this.get(key)

        if (animation !== this.current) {
            this.current.visible = false
            this.current = animation
            this.current.visible = true
        }

        return animation
    }
}
