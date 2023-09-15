import { Container, ITextStyle, Resource, settings, Sprite, Text, Texture } from 'pixi.js'

type IconOptions = { filename: string }

export class Icon {
    public container: Container
    public sprite: Sprite
    public text: Text

    constructor(options: IconOptions) {
        this.container = new Container()
        this.sprite = new Sprite(Texture.from(options.filename, this.getTexture()))
        this.text = new Text('0', this.getText())
        this.sprite.height = 4
        this.sprite.width = 4
        this.container.addChild(this.sprite, this.text)
    }

    private getTexture(): Partial<Texture<Resource>> {
        return {
            width: 8,
            height: 8
        }
    }

    private getText(): Partial<ITextStyle> {
        return {
            fontFamily: 'Arial',
            fontSize: 12,
            fill: 0x000000,
            align: 'center'
        }
    }
}
