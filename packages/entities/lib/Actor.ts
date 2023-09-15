import { Idle } from '@package/behaviours'
import { Helper, Vector2 } from '@package/utils'
import { AnimatedSprite, Texture, Sprite, MIPMAP_MODES, settings, SCALE_MODES } from 'pixi.js';

type ActorOptions = {
    position: Vector2
    texture: string
    width: number
    height: number
}

export class Actor {
    public sprite: Sprite
    public behaviours: { idle: Idle }
    public animation: AnimatedSprite

    constructor(options: ActorOptions) {
        this.sprite = Helper.sprite.create(options.texture, options)
        this.behaviours = { idle: new Idle() }

        const textures = [
            Texture.from('assets/sprites/actors/Idle1.png', {
                mipmap: MIPMAP_MODES.POW2,
                width: 32,
                height: 32
            }),
            Texture.from('assets/sprites/actors/Idle2.png', {
                mipmap: MIPMAP_MODES.POW2,
                width: 32,
                height: 32
            })
        ];

        this.animation = new AnimatedSprite(textures)
    }
}
