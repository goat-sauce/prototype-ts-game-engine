import { Engine } from '@preload/core'
import { Vector2 } from '@shared/helpers'
import { Container, DisplayObject, Graphics, Text, TextStyle } from 'pixi.js'
import { DialogBoxState, Layer } from 'preload/game/types'
import { GameObject } from '../classes/GameObject'

export class DialogBox extends GameObject<DialogBoxState> {
    public graphics: Graphics
    public container: Container
    public text: Text
    public layer: Layer = 'gui'

    public constructor(state: DialogBoxState) {
        super(state)

        this.container = new Container()

        this.text = new Text(this.state.bag.conversation[this.state.bag.index]);

        this.text.style = new TextStyle({
            fontFamily: 'retro',
            fontSize: 18,
            fill: 0x000000,
            align: 'center'
        })

        const padding = 50

        const getDimension = (min: number, value: number, padding: number): number => {
            const calc = value + (padding * 2)
            if (calc >= min) return calc
            return min
        }

        this.graphics = new Graphics()
        this.graphics.beginFill(0xffffff)
        this.graphics.zIndex = 10
        this.graphics.drawRect(0, 0, getDimension(600, this.text.width, 50), getDimension(200, this.text.height, 25))
        this.graphics.position = new Vector2(0, 0)

        this.container.addChild(this.graphics)
        this.container.addChild(this.text)

        this.text.position.x = this.container.width / 2 - this.text.width / 2
        this.text.position.y = this.container.height / 2 - this.text.height / 2

        this.container.position.x = Engine.renderer.screen.width / 2 - this.container.width / 2
        this.container.position.y = Engine.renderer.screen.height - this.container.height - padding

        Engine.layers.gui.container.addChild(this.container)
    }

    public async render(): Promise<DisplayObject> {
        this.state.bag.conversation[this.state.bag.index]
        return this.container
    }
}
