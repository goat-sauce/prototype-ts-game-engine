import { BaseTexture, SCALE_MODES, settings } from 'pixi.js'

export const renderer = {
    settings: (): void => {
        BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST
        BaseTexture.defaultOptions.anisotropicLevel = 0
        settings.ROUND_PIXELS = true
        settings.RESOLUTION = 1
    }
}
