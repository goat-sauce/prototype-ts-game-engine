import { config } from '@package/config'
import { Vector2 } from '@package/entities'
import { Graph } from './Graph'

export class Chunk {
    public graph: Graph = new Graph(config.chunk.size)
    public position: Vector2

    constructor(position: Vector2) {
        this.position = position
    }
}
