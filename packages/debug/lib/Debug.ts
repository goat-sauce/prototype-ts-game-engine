import { config } from '@package/config'
import { Graphics as GraphicsPIXI, Sprite } from 'pixi.js'

export namespace Debug {
    export class Graphics {
        public static anchor(sprite: Sprite) {
            if (!config.debug) return
            const graphics = new GraphicsPIXI()
            graphics.beginFill(0xffff00)
            graphics.lineStyle(1, 0xff0000)
            graphics.drawRect(sprite.anchor.x - 1, sprite.anchor.y - 1, 1, 1)
            sprite.addChild(graphics)
        }
    }
    export class Logger {
        static log(message?: any, ...optionalParams: any[]) {
            console.log(JSON.parse(JSON.stringify(message)), ...optionalParams)
        }
        static error(message?: any, ...optionalParams: any[]) {
            console.log(message, ...optionalParams)
        }
    }
}
