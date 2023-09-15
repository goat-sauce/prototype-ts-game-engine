import { Vector2 } from '@shared/helpers'
import { Scene } from '../classes/Scene'
import { Player } from '../objects/Player.object'
import { Portal } from '../objects/Portal.object'
import { StarterLevel } from '../objects/StarterLevel.object'
import { InteriorScene } from './Interior.scene'

type StarterSceneGameObjects = {
    starterLevel: StarterLevel,
    player: Player,
    portal: Portal
}

export class StarterScene extends Scene {
    public gameObjects: StarterSceneGameObjects

    public constructor() {
        super()

        this.gameObjects = {
            player: new Player({
                spawn: new Vector2(13, 12),
                animation: 'idle'
            }),
            starterLevel: new StarterLevel({}),
            portal: new Portal({
                position: new Vector2(14, 14),
                Scene: InteriorScene
            })
        }
    }
}
