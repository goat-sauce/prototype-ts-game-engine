import { MIPMAP_MODES, Sprite, Texture } from "pixi.js";
import { Vector2 } from "./Vector2";

export class Prop {
    public sprite: Sprite;

    constructor({ position }: { position: Vector2 }) {
        const texture = Texture.from('assets/sprites/props/Stone.png', {
            width: 32,
            height: 32,
            mipmap: MIPMAP_MODES.POW2
        });
        const sprite = new Sprite(texture);
        sprite.position.x = position.x * 32;
        sprite.position.y = position.y * 32;
        // sprite.anchor.x = 0.16;
        // sprite.anchor.y = 0.16;
        sprite.height = 32;
        sprite.width = 32;
        this.sprite = sprite;
    }
}