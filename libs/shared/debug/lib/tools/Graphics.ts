import { config } from '@shared/config'
import { Graphics as GraphicsPIXI, Sprite } from 'pixi.js'

export const Graphics = {
    anchor: (sprite: Sprite): void => {
        if (!config.debug) return
        const graphics = new GraphicsPIXI()
        graphics.beginFill(0xffff00)
        graphics.lineStyle(1, 0xff0000)
        graphics.drawRect(sprite.anchor.x - 1, sprite.anchor.y - 1, 1, 1)
        sprite.addChild(graphics)
    },
    shape: (): GraphicsPIXI => {
        const graphics = new GraphicsPIXI()
        graphics.beginFill(0xff0000)
        graphics.zIndex = 1000
        return graphics
    }
}
