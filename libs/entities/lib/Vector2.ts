import { config } from '@package/config'

export class Vector2 {
    public x: number
    public y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    public static normalize(x: number, y: number) {
        return {
            x: x * config.base.size.x,
            y: y * config.base.size.y
        }
    }

    public static chunkize(x: number, y: number) {
        return {
            x: x * config.chunk.size.x,
            y: y * config.chunk.size.y
        }
    }

    public static localize(x: number, y: number) {
        return {
            x: Math.floor(x / config.base.size.x),
            y: Math.floor(y / config.base.size.y)
        }
    }

    public static equal(a: Vector2, b: Vector2) {
        return a.x === b.x && a.y === b.y
    }

    public static key(position: Vector2) {
        return `${position.x.toString().replace('-', 'n')}_${position.y.toString().replace('-', 'n')}`
    }
}
