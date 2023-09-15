import { Vector2 } from '@package/utils'
import { Node } from './Node'

export class Chunk {
    private size: Vector2
    public nodes: Map<string, Node>

    constructor(size: Vector2) {
        this.size = size
        this.nodes = this.generate()
    }

    public key(position: Vector2) {
        return `${position.x}|${position.y}`
    }

    private generate() {
        const nodes = new Map()

        for (let x = 0; x < this.size.x; x++) {
            for (let y = 0; y < this.size.y; y++) {
                const position = new Vector2(x, y)
                const key = this.key(position)
                const node = new Node(key, position, 'assets/sprites/tiles/base/Grass.png')
                nodes.set(key, node)
            }
        }

        return nodes
    }
}
