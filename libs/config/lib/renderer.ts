import { SCALE_MODES, settings } from "pixi.js"

export const renderer = {
    settings: () => {
        settings.SCALE_MODE = SCALE_MODES.NEAREST
        settings.ROUND_PIXELS = true
        settings.ANISOTROPIC_LEVEL = 0
        settings.RESOLUTION = 1
    }
}