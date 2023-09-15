import { config } from '@package/config'
import { Debug } from '@package/debug'
import { Vector2 } from '@package/entities'
import { IpcMainInvokeEvent } from 'electron'
import { existsSync } from 'fs'
import { readFile } from 'fs/promises'
import { Chunk } from '../../../libs/entities/lib/Chunk'
import { Service } from './abstract/Service'

export class ChunkService extends Service {
    public async get(event: IpcMainInvokeEvent, options: { position: Vector2 }): Promise<Record<string, Chunk>> {
        try {
            const chunk = await ChunkService.read(options.position)
            if (!chunk) throw 'Error'
            return await ChunkService.neighbors(chunk, config.distance)
        } catch (error) {
            Debug.logger.error(error)
            return {}
        }
    }

    public static async read(position: Vector2): Promise<Chunk | null> {
        try {
            return JSON.parse(await readFile(`${config.dir.data}/${Vector2.key(position)}.json`, 'utf-8'))
        } catch (error) {
            return null
        }
    }

    public static positions(chunk: Chunk, distance: number): Vector2[] {
        const positions = []

        for (let d = 1; d <= distance; d++) {
            const x = config.chunk.size.x * d
            const y = config.chunk.size.y * d
            const p = new Vector2(chunk.position.x + x, chunk.position.y + y)
            const n = new Vector2(chunk.position.x - x, chunk.position.y - y)

            positions.push([
                new Vector2(chunk.position.x, p.y),
                new Vector2(chunk.position.x, n.y),
                new Vector2(p.x, chunk.position.y),
                new Vector2(n.x, chunk.position.y),
                new Vector2(n.x, p.y),
                new Vector2(p.x, p.y),
                new Vector2(n.x, n.y),
                new Vector2(p.x, n.y)
            ])
        }

        return positions.flat()
    }

    public static async neighbors(chunk: Chunk, distance: number, chunks?: Record<string, Chunk>): Promise<Record<string, Chunk>> {
        try {
            const neighbors: Record<string, Chunk> = {}
            const positions: Vector2[] = ChunkService.positions(chunk, distance)

            neighbors[Vector2.key(chunk.position)] = chunk

            for (const position of positions) {
                const key = Vector2.key(position)
                const exists = existsSync(`${config.dir.data}/${key}.json`)
                let chunk: Chunk | null = null
                if (chunks) chunk = chunks[key]
                if (!chunk && exists) chunk = JSON.parse(await readFile(`${config.dir.data}/${key}.json`, 'utf-8'))
                if (chunk) neighbors[key] = chunk
            }

            return neighbors
        } catch (error) {
            Debug.logger.log(error)
            return {}
        }
    }
}
