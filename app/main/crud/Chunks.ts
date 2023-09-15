import { config } from "@package/config"
import { Vector2 } from "@package/entities"
import { Chunk } from "../classes/Chunk"
import { CRUDService } from "./abstract/CRUDService"

export class Chunks extends CRUDService {
    public override create: () => void = async () => {
        const size = config.world.size / config.chunk.size
        const chunks: Chunk[] = []

        for (let chunk = 0; chunk < size; chunk++) {
            chunks.push(new Chunk(chunk, new Vector2(config.chunk.size * chunk, config.chunk.size * chunk)))
        }

        return chunks
    }
}