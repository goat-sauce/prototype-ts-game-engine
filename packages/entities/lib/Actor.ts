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

  constructor(options: ActorOptions) {
    this.sprite = Helper.sprite.create(options.texture, options)
  }
}
