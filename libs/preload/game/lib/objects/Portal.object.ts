import { Engine } from '@preload/core'
// import { config } from '@shared/config'
import { Vector2 } from '@shared/helpers'
import { Container, DisplayObject } from 'pixi.js'
import { GameObject } from '../classes/GameObject'
import { Scene } from '../classes/Scene'
// import { Physics } from '../entities/Physics'

type PortalState = {
    position: Vector2,
    Scene: typeof Scene
}

export class Portal extends GameObject<PortalState> {
    public container: Container
    // public physics: Physics.Box

    public constructor(state: PortalState) {
        super(state)
        this.container = new Container()
        this.container.position = Vector2.normalize(this.state.bag.position)
        // this.physics = new Physics.Box(this.container, {
        //     ref: this.ref,
        //     box: {
        //         width: config.base.size.x,
        //         height: config.base.size.y,
        //         sensor: true
        //     },
        //     body: {
        //         position: Vector2.float32(this.container.position),
        //         mass: 0
        //     }
        // })
    }

    public async render(): Promise<DisplayObject> {
        return this.container
    }

    public async interact(): Promise<void> {
        Engine.scene.destroy()
        Engine.scene = new this.state.bag.Scene()
        Engine.scene.load()
        Engine.layers.stage.target = Engine.scene.gameObjects.player
    }
}
