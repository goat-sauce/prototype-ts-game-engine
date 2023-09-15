import { Vector2 } from '@package/utils'
import { MIPMAP_MODES, Sprite, Texture } from 'pixi.js'

export class Prop {
    public sprite: Sprite

    constructor({ position, filename }: { filename: string; position: Vector2 }) {
        const texture = Texture.from(filename, {
            width: 32,
            height: 32,
            mipmap: MIPMAP_MODES.POW2
        })
        const sprite = new Sprite(texture)
        sprite.position.x = position.x * 32
        sprite.position.y = position.y * 32
        sprite.height = 32
        sprite.width = 32
        this.sprite = sprite
    }
}
