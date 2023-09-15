import { Scene } from '../classes/Scene'
import { StartMenu } from '../objects/StartMenu.object'

type StartSceneGameObjects = {
    startMenu: StartMenu
}

export class StartScene extends Scene {
    public gameObjects: StartSceneGameObjects

    public constructor() {
        super()

        this.gameObjects = {
            startMenu: new StartMenu({ index: 0 })
        }
    }
}
