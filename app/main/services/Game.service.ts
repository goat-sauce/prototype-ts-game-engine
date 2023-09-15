import { existsSync } from 'fs'
import { join } from 'path'
import { config } from '@package/config'
import { Debug } from '@package/debug'
import { Vector2, World } from '@package/entities'
import { mkdir, writeFile } from 'fs/promises'
import { Service } from './abstract/Service'
import { ChunkService } from './Chunk.service'
import { Load, Save } from '../types'

const Errors = {
    FailedToSave: 'Failed to save.'
}

export class GameService extends Service {
    public async create(): Promise<Load | null> {
        try {
            const world = new World()
            const start = world.chunks[Vector2.key(config.spawn)]
            const chunks = await ChunkService.neighbors(start, config.distance, world.chunks)
            const save = await GameService.save(world)
            if (save.success) return { chunks }
            throw Errors.FailedToSave
        } catch (error) {
            Debug.logger.error(error)
            return null
        }
    }

    public static async save(world: World): Promise<Save> {
        try {
            const dirs = config.dir.data.split('/')
            let path = ''

            for (const dir of dirs) {
                path = join(path, dir)
                const exists = existsSync(path)
                if (!exists) await mkdir(path)
            }

            for (const key of Object.keys(world.chunks)) {
                await writeFile(`${config.dir.data}/${key}.json`, JSON.stringify(world.chunks[key]))
            }

            return {
                success: true
            }
        } catch (error) {
            Debug.logger.error(error)

            return {
                success: false
            }
        }
    }
}
