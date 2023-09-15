import { Container } from 'pixi.js'
import { GUI } from '../layers/GUI'
import { Stage } from '../layers/Stage'

export class Layers {
    public container: Container = new Container()
    public gui: GUI = new GUI()
    public stage: Stage = new Stage()

    public constructor() {
        this.stage.container.zIndex = 0
        this.gui.container.zIndex = 1
        this.container.addChild(this.stage.container)
        this.container.addChild(this.gui.container)
        this.container.sortableChildren = true
    }
}
