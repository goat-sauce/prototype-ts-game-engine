import { config } from '@package/config';
import { Debug } from '@package/debug'
import { Vector2 } from '@package/entities'
import { IpcMainInvokeEvent } from 'electron';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises'
import { Chunk } from '../classes/Chunk';
import { Service } from './abstract/Service'

export class ChunkService extends Service {
    public async get(event: IpcMainInvokeEvent, options: { position: Vector2 }) {
        try {
            const chunk: Chunk = JSON.parse(await readFile(`${config.dir.data}/${Vector2.key(options.position)}.json`, 'utf-8'))
            return await ChunkService.neighbors(chunk, config.distance)
        } catch (error) {
            Debug.Logger.error(error)
        }
    }

    public static async neighbors(chunk: Chunk, distance: number, chunks?: Record<string, Chunk>) {
        const neighbors = {}
        const positions = []

        neighbors[Vector2.key(chunk.position)] = chunk;

        for (let d = 1; d <= distance; d++) {
            const x = config.chunk.size.x * d
            const y = config.chunk.size.y * d
            const v = new Vector2(chunk.position.x + x, chunk.position.y + y)
            const n = new Vector2(chunk.position.x - x, chunk.position.y - y)

            positions.push([
                new Vector2(chunk.position.x, v.y),
                new Vector2(chunk.position.x, n.y),
                new Vector2(v.x, chunk.position.y),
                new Vector2(n.x, chunk.position.y),
                new Vector2(n.x, v.y),
                new Vector2(v.x, v.y),
                new Vector2(n.x, n.y),
                new Vector2(v.x, n.y)
            ])
        }

        for (const position of positions.flat()) {
            const key = Vector2.key(position)
            const exists = existsSync(`${config.dir.data}/${key}.json`)
            let chunk: Chunk = null;
            if (chunks) chunk = chunks[key]
            if (!chunk && exists) chunk = JSON.parse(await readFile(`${config.dir.data}/${key}.json`, 'utf-8'))
            if (chunk) neighbors[key] = chunk
        }

        return neighbors
    }
}
