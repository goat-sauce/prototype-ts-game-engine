import { Villager } from '@package/actions'
import { config } from '@package/config'
import { Client } from '@package/core'
import { Vector2 } from '@package/utils'
import { Container, FederatedPointerEvent, MIPMAP_MODES, Sprite, Texture } from 'pixi.js'

export class Node {
    public key: string
    public position: Vector2
    public tile: Sprite
    public tileHover: Sprite
    public container: Container

    constructor(key: string, position: Vector2) {
        this.key = key
        this.position = position
        this.tile = this.getTile(this.getTexture('assets/sprites/tiles/Grass.png'))
        this.tileHover = this.getSprite(this.getTexture('assets/sprites/icons/Select.png'))
        this.container = new Container()
        this.container.addChild(this.tile)
    }

    getTile(texture: Texture) {
        const sprite = this.getSprite(texture)

        sprite.interactive = true

        sprite.on('mouseentercapture', (event: FederatedPointerEvent) => {
            this.handleMouseEnter(event)
        })

        sprite.on('mouseleavecapture', (event: FederatedPointerEvent) => {
            this.handleMouseLeave(event)
        })

        sprite.on('mousedown', (event: FederatedPointerEvent) => {
            Client.queue.push(new Villager({ event, position: this.position }))
        })

        return sprite
    }

    handleMouseEnter(event: FederatedPointerEvent) {
        this.container.addChild(this.tileHover)
    }

    handleMouseLeave(event: FederatedPointerEvent) {
        this.container.removeChild(this.tileHover)
    }

    getSprite(texture: Texture) {
        const sprite = new Sprite(texture)
        sprite.position.x = config.baseUnit * this.position.x
        sprite.position.y = config.baseUnit * this.position.y
        sprite.height = config.baseUnit
        sprite.width = config.baseUnit
        return sprite
    }

    getTexture(filename: string) {
        return Texture.from(filename, {
            width: 32,
            height: 32,
            mipmap: MIPMAP_MODES.POW2
        })
    }
}
