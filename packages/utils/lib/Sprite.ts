import { config } from '@package/config'
import { Debug } from '@package/debug'
import { MIPMAP_MODES, Sprite as SpritePIXI, Texture } from 'pixi.js'
import { Vector2 } from './Vector2'

type SpriteOptions = { width: number; height: number; position: Vector2 }

export namespace Helper {
    export const sprite = {
        create: (filename: string, options: SpriteOptions) => {
            const sprite = new SpritePIXI(
                Texture.from(filename, {
                    width: options.width,
                    height: options.height,
                    mipmap: MIPMAP_MODES.POW2,
                }),
            )

            sprite.anchor.x = 0.5
            sprite.anchor.y = 0.5
            sprite.position.x = options.position.x * config.baseUnit + config.baseUnit / 2
            sprite.position.y = options.position.y * config.baseUnit + config.baseUnit / 2

            Debug.Graphics.anchor(sprite)

            return sprite
        },
    }
}
