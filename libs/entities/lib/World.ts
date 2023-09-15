import { config } from '@package/config'
import { Chunk, Vector2 } from '@package/entities'

export class World {
    public chunks: Record<string, Chunk>

    public constructor() {
        this.chunks = this.generate()
    }

    public generate(): Record<string, Chunk> {
        const chunks: Record<string, Chunk> = {}

        for (let x = 0; x < config.world.x; x++) {
            for (let y = 0; y < config.world.y; y++) {
                const position = Vector2.chunkize(new Vector2(x, y))
                chunks[Vector2.key(position)] = new Chunk(position)
            }
        }

        return chunks
    }
}
