import { Engine } from '@preload/core'
import { Container, DisplayObject, Graphics, Text } from 'pixi.js'
import { StartMenuState } from 'preload/game/types'
import { GameObject } from '../classes/GameObject'

export class StartMenu extends GameObject<StartMenuState> {
    public graphics: Graphics
    public items: string[]
    public container: Container
    public padding: number

    public constructor(state: StartMenuState) {
        super(state)
        const width = 400;
        const height = 400;

        this.items = ['Start', 'Settings', 'Exit']
        this.padding = 15
        this.container = new Container()
        this.container.position.x = Engine.renderer.screen.width / 2 - width / 2
        this.container.position.y = Engine.renderer.screen.height / 2 - height / 2
        this.graphics = new Graphics()
        this.graphics.beginFill(0xff0000)
        this.graphics.drawRect(0, 0, width, this.container.height)
        this.container.addChild(this.graphics)

        for (const [index, item] of this.items.entries()) {
            const text = new Text(item, {
                fontFamily: 'rainyhearts',
                fontSize: '26px',
                fill: 0xFFFFFF,
                align: 'center'
            })
            text.resolution = 2
            text.anchor.set(0.5)
            text.position.y = text.height * index + this.padding * index
            text.position.x = this.graphics.width / 2
            text.interactive = true

            text.on('mouseenter', () => {
                text.style.fill = 0xFF00FF
            })

            text.on('mouseleave', () => {
                text.style.fill = 0xFFFFFF
            })

            this.graphics.addChild(text)
        }

        Engine.layers.stage.container.addChild(this.container)
    }

    public async render(): Promise<DisplayObject> {
        // this.container.position.x = Engine.renderer.screen.width / 2 - this.container.width / 2
        // this.container.position.y = Engine.renderer.screen.height / 2 - this.container.height / 2
        return this.container
    }
}
