import { Behaviour, Idle } from '@package/behaviours'
import { Helper, Vector2 } from '@package/utils'
import { Sprite } from 'pixi.js'

type ActorOptions = {
    position: Vector2
    texture: string
    width: number
    height: number
}

export class Actor {
    public sprite: Sprite
    public behaviours: Behaviour[]

    constructor(options: ActorOptions) {
        this.sprite = Helper.sprite.create(options.texture, options)
        this.behaviours = [new Idle()]
    }
}
