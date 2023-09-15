import { config } from '@package/config'

export class Vector2 {
    public x: number
    public y: number

    public constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    public static normalize(vector: Vector2): Vector2 {
        return {
            x: vector.x * config.base.size.x,
            y: vector.y * config.base.size.y
        }
    }

    public static chunkize(vector: Vector2): Vector2 {
        return {
            x: vector.x * config.chunk.size.x,
            y: vector.y * config.chunk.size.y
        }
    }

    public static localize(vector: Vector2): Vector2 {
        return {
            x: Math.floor(vector.x / config.base.size.x),
            y: Math.floor(vector.y / config.base.size.y)
        }
    }

    public static equal(a: Vector2, b: Vector2): boolean {
        return a.x === b.x && a.y === b.y
    }

    public static key(position: Vector2): string {
        return `${position.x.toString().replace('-', 'n')}_${position.y.toString().replace('-', 'n')}`
    }
}
