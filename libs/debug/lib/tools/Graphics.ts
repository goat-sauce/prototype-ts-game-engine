import { config } from '@package/config'
import { Vector2 } from '@package/helpers'
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
    rect: (position = new Vector2(0, 0)): GraphicsPIXI => {
        const graphics = new GraphicsPIXI()
        graphics.beginFill(0xffff00)
        graphics.lineStyle(10, 0xff0000)
        graphics.drawRect(position.x, position.y, 1, 1)
        return graphics
    }
}
