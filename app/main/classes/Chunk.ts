import { config } from '@package/config'
import { Vector2 } from '@package/entities'
import { Node } from './Node'

export class Chunk {
    public position: Vector2
    public nodes: Map<string, Node>

    constructor(index: number, position: Vector2) {
        this.nodes = this.generate(index)
        this.position = position
    }

    public key(position: Vector2) {
        return `${position.x}|${position.y}`
    }

    private generate(index: number) {
        const nodes = new Map()

        for (let x = 0; x < config.chunk.size; x++) {
            for (let y = 0; y < config.chunk.size; y++) {
                const position = new Vector2(x, y)
                const key = this.key(position)
                const node = new Node(key, position, 'assets/spritesheets/tiles/base/Grass.png')
                nodes.set(key, node)
            }
        }

        return nodes
    }
}
