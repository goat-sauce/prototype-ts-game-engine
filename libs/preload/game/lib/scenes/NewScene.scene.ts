import { Scene } from '../classes/Scene'
import { Scratch } from '../objects/Scratch.object'

export class GameScene extends Scene {
    public constructor() {
        super()

        this.gameObjects = {
            scratch: new Scratch({})
        }
    }
}
