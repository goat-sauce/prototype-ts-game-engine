import { config } from '@package/config'
import { Vector2 } from '@package/entities'
import { Chunk } from '../classes/Chunk'

export class World {
    public chunks: Record<string, Chunk>

    constructor() {
        this.chunks = this.generate()
    }

    public generate() {
        const chunks = {}

        for (let x = 0; x < config.world.x; x++) {
            for (let y = 0; y < config.world.y; y++) {
                const position = Vector2.chunkize(x, y)
                chunks[Vector2.key(position)] = new Chunk(position)
            }
        }

        return chunks
    }
}
