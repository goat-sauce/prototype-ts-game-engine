import { Vector2 } from '@shared/helpers'
import { Scene } from '../classes/Scene'
import { Player } from '../objects/Player.object'
import { TestLevel } from '../objects/TestLevel.object'

export class TestScene extends Scene {
    public constructor() {
        super()

        this.gameObjects = {
            testLevel: new TestLevel({}),
            player: new Player({
                animation: 'idle',
                spawn: new Vector2(0, 0)
            })
        }
    }
}
