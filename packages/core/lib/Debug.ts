import { config } from "@package/config";
import { Graphics, Sprite } from "pixi.js";

export class Debug {
    public static anchor(sprite: Sprite) {
        if (!config.debug) return;
        const graphics = new Graphics();
        graphics.beginFill(0xFFFF00)
        graphics.lineStyle(1, 0xFF0000);
        graphics.drawRect(sprite.anchor.x - 1, sprite.anchor.y - 1, 1, 1);
        sprite.addChild(graphics);
    }
}