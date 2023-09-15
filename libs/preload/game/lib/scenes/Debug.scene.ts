import { Vector2 } from '@shared/helpers'
import { Scene } from '../classes/Scene'
import { DialogBox } from '../objects/DialogBox.object'
import { House } from '../objects/House.object'
import { Npc } from '../objects/Npc.object'
import { Player } from '../objects/Player.object'

type DebugSceneGameObjects = {
    house: House,
    player: Player,
    npc: Npc,
    dialogBox: DialogBox
}

export class DebugScene extends Scene {
    public gameObjects: DebugSceneGameObjects

    public constructor() {
        super()


        this.gameObjects = {
            house: new House({}),
            player: new Player({
                animation: 'left',
                spawn: new Vector2(3, 8)
            }),
            npc: new Npc({
                animation: 'idle',
                spawn: new Vector2(5, 5),
                running: false
            }),
            dialogBox: new DialogBox({
                conversation: ['Test', 'Conversation', 'Lol'],
                index: 0
            })
        }
    }
}
