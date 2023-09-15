import { config } from '@package/config'
import { Debug } from '@package/core'
import { Container, Sprite, Text, Texture } from 'pixi.js'

type ButtonOptions = {
  text: string
}

export class Button {
  n
  public sprite: Sprite
  public text: Text

  constructor(buttonOptions: ButtonOptions) {
    this.sprite = new Sprite(
      Texture.from('assets/sprites/gui/button.png', {
        width: 128,
        height: 32,
      }),
    )

    this.sprite.width = 128
    this.sprite.height = 32
    this.text = new Text(buttonOptions.text, {
      fontFamily: 'pixel',
      fontSize: 12,
    })
    this.text.anchor.x = 0.5
    this.text.anchor.y = 0.5
    this.text.transform.position.x = this.sprite.width / 2
    this.text.transform.position.y = this.sprite.height / 2
    this.sprite.addChild(this.text)
    this.sprite.interactive = true
    this.sprite.on('click', () => true)

    if (config.debug) Debug.anchor(this.text)
  }
}
