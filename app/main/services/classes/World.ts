import { config } from '@package/config'
import { Vector2 } from '@package/helpers'
import { Graph } from './Graph'

export class World {
    public graph: Graph

    public constructor() {
        this.graph = new Graph(new Vector2(config.world.size.x, config.world.size.y))
    }
}
