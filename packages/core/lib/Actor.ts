import { config } from "@package/config";
import { Graphics, MIPMAP_MODES, Rectangle, settings, Sprite, Texture } from "pixi.js";
import { Debug } from "./Debug";
import { Vector2 } from "./Vector2";

type ActorOptions = { position: Vector2, texture: string, width: number, height: number };

export class Actor {
    public sprite: Sprite;

    constructor(options: ActorOptions) {
        this.sprite = this.getSprite(options);
    }

    private getSprite(options: ActorOptions) {
        const sprite = new Sprite(Texture.from(options.texture, {
            width: options.width,
            height: options.height,
            mipmap: MIPMAP_MODES.POW2
        }));

        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        sprite.position.x = options.position.x * config.baseUnit + config.baseUnit / 2;
        sprite.position.y = options.position.y * config.baseUnit + config.baseUnit / 2;

        Debug.anchor(sprite);

        return sprite;
    }
}