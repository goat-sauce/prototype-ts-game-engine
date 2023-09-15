import { Application, Sprite, Texture, Ticker } from "pixi.js"
import { Vector2 } from "./app/classes/Vector2";

export type TilemapOptions = { size: Vector2 };

declare global {
    interface Window {
        render: { start: () => void, stop: () => void }
    }
}
