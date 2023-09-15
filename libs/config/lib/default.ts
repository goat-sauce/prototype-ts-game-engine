import { Vector2 } from '@package/entities'

export const config = {
    debug: false,
    distance: 0,
    spawn: new Vector2(0, 0),
    dir: {
        data: 'build/data',
        assets: 'out'
    },
    window: {
        size: new Vector2(1280, 720)
    },
    base: {
        size: {
            x: 64,
            y: 64
        }
    },
    chunk: {
        size: {
            x: 16,
            y: 16
        }
    },
    world: {
        x: 16,
        y: 16
    }
}
