import { config } from '@package/config'
import { Vector2 } from '@package/entities'
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

        public static rect(position = new Vector2(0, 0)) {
            const graphics = new GraphicsPIXI()
            graphics.beginFill(0xffff00)
            graphics.lineStyle(10, 0xff0000)
            graphics.drawRect(position.x, position.y, 1, 1)
            return graphics
        }
    }

    export class Logger {
        static normalize(message: any) {
            return JSON.parse(JSON.stringify(message))
        }

        static log(message?: any, ...optionalParams: any[]) {
            console.log(Logger.normalize(message), ...Logger.normalize(optionalParams))
        }

        static info(message?: any, ...optionalParams: any[]) {
            console.info(Logger.normalize(message), ...Logger.normalize(optionalParams))
        }

        static warn(message?: any, ...optionalParams: any[]) {
            console.warn(Logger.normalize(message), ...Logger.normalize(optionalParams))
        }

        static error(message?: any, ...optionalParams: any[]) {
            console.error(Logger.normalize(message), ...Logger.normalize(optionalParams))
        }
    }
}
