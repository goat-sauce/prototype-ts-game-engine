import { SCALE_MODES, settings } from 'pixi.js'

export const config = {
    baseUnit: 64,
    debug: false,
    distance: 1,
    chunk: {
        size: 8
    },
    world: {
        size: 256
    },
    renderer: () => {
        settings.SCALE_MODE = SCALE_MODES.NEAREST
        settings.ROUND_PIXELS = true
        settings.ANISOTROPIC_LEVEL = 0
        settings.RESOLUTION = 1
    }
}
