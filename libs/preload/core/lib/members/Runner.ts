import { GameObject } from '@preload/game'
import { DisplayObject } from 'pixi.js'
import { Layer } from 'preload/game/types'
import { Engine } from '../Engine'
import { Physics } from './Physics'

export class Runner {
    public async render(gameObjects: GameObject<any>[]): Promise<void> {
        for (const gameObject of gameObjects) {
            await gameObject.render()
        }
    }

    public async setup(gameObjects: GameObject<any>[]): Promise<void> {
        for (const gameObject of gameObjects) {
            this.register(gameObject)
            this.inject(gameObject.layer, await gameObject.render())
        }
    }

    public async conductor(): Promise<void> {
        console.log(Physics.interaction.values())
        for (const interaction of Physics.interaction.values()) {
            const a = interaction[0]
            const b = interaction[1]

            a.interact(b)
            b.interact(a)
        }

        Physics.interaction = new Map()
    }

    public async inject(layer: Layer, object: DisplayObject): Promise<void> {
        Engine.layers[layer].container.addChild(object)
    }

    public register(gameObject: GameObject<any>): void {
        Engine.registry.gameObjects.set(gameObject.ref, gameObject)
    }
}
