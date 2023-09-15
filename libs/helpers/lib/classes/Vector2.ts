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

    public static convert(float32: [number, number]): Vector2 {
        return {
            x: float32[0],
            y: float32[1]
        }
    }

    public static float32(position: Vector2): [number, number] {
        return [position.x, position.y]
    }
}
