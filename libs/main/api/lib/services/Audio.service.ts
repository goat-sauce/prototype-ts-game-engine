import { config } from '@shared/config'
import { Debug } from '@shared/debug'
import { FileHelper } from '@shared/helpers'
import { readFile } from 'fs/promises'
import { join, parse } from 'path'
import { Errors } from '../Errors'
import { Service } from './abstract/Service'

export class AudioService extends Service {
    public async get(): Promise<Record<string, Buffer>> {
        try {
            const paths = await FileHelper.search(join(__dirname, config.dir.assets), '.ogg', [])
            const soundtracks: Record<string, Buffer> = {}

            for (const path of paths) {
                const buffer = await readFile(path)
                soundtracks[parse(path).name] = buffer
            }

            return soundtracks
        } catch (error) {
            Debug.logger.error(Errors.FailedAudioService, error)
            return {}
        }
    }
}
