import { config } from '@shared/config'
import { Vector2 } from '@shared/helpers'
import { Graph } from './Graph'

export class World {
    public graph: Graph

    public constructor() {
        this.graph = new Graph(new Vector2(config.world.size.x, config.world.size.y))
    }
}
