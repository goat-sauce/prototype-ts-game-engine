import { MIPMAP_MODES, Sprite, Texture } from "pixi.js";

export class Actor {
    public sprite: Sprite;

    constructor() {
        const texture = Texture.from('BaseCharacterForward.png', {
            width: 32,
            height: 32,
            mipmap: MIPMAP_MODES.POW2
        });
        const sprite = new Sprite(texture);
        sprite.position.x = 0;
        sprite.position.y = 0;
        // sprite.anchor.x = 0.16;
        // sprite.anchor.y = 0.16;
        sprite.height = 32;
        sprite.width = 32;
        this.sprite = sprite;
    }
}