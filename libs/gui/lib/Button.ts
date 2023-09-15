import { Debug } from '@package/debug'
import { ButtonOptions } from 'gui/types'
import { Sprite, Text, Texture } from 'pixi.js'

export class Button {
    public sprite: Sprite
    public text: Text

    public constructor(options: ButtonOptions) {
        this.sprite = new Sprite(
            Texture.from('assets/spritesheets/gui/button/button.png', {
                width: 128,
                height: 32
            })
        )
        this.sprite.width = 128
        this.sprite.height = 32
        this.text = new Text(options.text, { fontFamily: 'pixel', fontSize: 12 })
        this.text.anchor.x = 0.5
        this.text.anchor.y = 0.5
        this.text.transform.position.x = this.sprite.width / 2
        this.text.transform.position.y = this.sprite.height / 2
        this.sprite.addChild(this.text)
        Debug.graphics.anchor(this.text)
    }
}
