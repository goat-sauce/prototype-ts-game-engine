import { Vector2 } from '@shared/helpers'
import { Scene } from '../classes/Scene'
import { Interior } from '../objects/Interior.object'
import { Player } from '../objects/Player.object'
import { Portal } from '../objects/Portal.object'
import { StarterScene } from './Starter.scene'

type InteriorSceneGameObjects = {
    interior: Interior,
    player: Player,
    portal: Portal
}

export class InteriorScene extends Scene {
    public gameObjects: InteriorSceneGameObjects

    public constructor() {
        super()

        this.gameObjects = {
            interior: new Interior({}),
            player: new Player({
                animation: 'idle',
                spawn: new Vector2(13, 8)
            }),
            portal: new Portal({
                position: new Vector2(10, 6),
                Scene: StarterScene
            })
        }
    }
}
