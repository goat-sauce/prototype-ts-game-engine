import { v4 as uuidv4 } from 'uuid'
import { Engine } from '@preload/core'
import { Debug } from '@shared/debug'
import { Vector2 } from '@shared/helpers'
import { Container, DisplayObject } from 'pixi.js'
import { GameObjectState } from './GameObjectState'

export class GameObject<S> {
    public ref: string = uuidv4()
    public layer: 'gui' | 'stage' = 'stage'
    public tags: string[] = ['default']
    public state: GameObjectState<S>
    public position: Vector2 = new Vector2(0, 0)

    public constructor(state: S) {
        this.state = new GameObjectState<S>(state, this.ref)
    }

    public async setup(state = this.state): Promise<DisplayObject> {
        Debug.logger.log({ status: 'setup', state })
        return new Container()
    }

    public async interact(gameObject: GameObject<any>): Promise<void> {
        Debug.logger.log({ status: 'interact', gameObject })
    }

    public async render(state = this.state): Promise<DisplayObject> {
        Debug.logger.log({ status: 'rendered', state })
        return new Container()
    }

    public unregister(): void {
        Engine.registry.gameObjects.delete(this.ref)
    }
}
