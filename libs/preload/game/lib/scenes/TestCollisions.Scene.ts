import { Vector2 } from '@shared/helpers'
import { Scene } from '../classes/Scene'
import { CollisionsTest } from '../objects/CollisionsTest.object'
import { Player } from '../objects/Player.object'

export class TestCollisionsScene extends Scene {
    public constructor() {
        super()

        this.gameObjects = {
            player: new Player({
                animation: 'idle',
                spawn: new Vector2(0, 0)
            }),
            collisionsTest: new CollisionsTest({})
        }
    }
}
