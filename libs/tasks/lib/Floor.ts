import { Vector2 } from '@package/utils'
import { Container } from 'pixi.js'
// import { TileMap } from 'entities'
import { Task } from './abstract/Task'

export class Floor extends Task {
    public override async complete() {
        // const floor = new TileMap(new Vector2(10, 10))
        return new Container()
    }
}
