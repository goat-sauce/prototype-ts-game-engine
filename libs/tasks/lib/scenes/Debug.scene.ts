import { Vector2 } from '@package/helpers';
import { Scene } from '../abstract/Scene';
import { House } from '../objects/House';
import { Npc } from '../objects/Npc';
import { Player } from '../objects/Player';

type DebugSceneTasks = {
    player: Player,
    npc: Npc,
    house: House
}

export class DebugScene extends Scene {
    public tasks: DebugSceneTasks

    public constructor() {
        super()
        this.tasks = {
            player: new Player({
                animation: 'idle',
                spawn: new Vector2(3, 8)
            }),
            npc: new Npc({
                animation: 'idle',
                spawn: new Vector2(5, 5)
            }),
            house: new House({})
        }
    }
}
