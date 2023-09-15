import { Debug } from '@shared/debug'
import { Loaded } from 'preload/core/types'
import { Atlas } from '../loaders/Atlas'
import { Audio } from '../loaders/Audio'
import { Spritesheets } from '../loaders/Spritesheets'
import { Tilemaps } from '../loaders/Tilemaps'

export class Assets {
    public audio: Audio = new Audio()
    public atlas: Atlas = new Atlas()
    public spritesheets: Spritesheets = new Spritesheets()
    public tilemaps: Tilemaps = new Tilemaps()

    public async load(): Promise<Loaded> {
        try {
            await this.atlas.load()
            await this.audio.load()
            await this.spritesheets.load()
            await this.tilemaps.load()

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
