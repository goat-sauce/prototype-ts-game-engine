import { Vector2 } from '@package/entities'
import { Node } from './Node'

export class Graph {
    private size: Vector2
    public nodes: Record<string, Node>

    public constructor(size: Vector2) {
        this.size = size
        this.nodes = this.generate()
    }

    private generate(): Record<string, Node> {
        const nodes: Record<string, Node> = {}

        for (let x = 0; x < this.size.x; x++) {
            for (let y = 0; y < this.size.y; y++) {
                const position = new Vector2(x, y)
                nodes[Vector2.key(position)] = new Node(position)
            }
        }

        return nodes
    }
}
