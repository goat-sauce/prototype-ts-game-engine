import { Debug } from '@shared/debug'
import { Loaded } from 'preload/core/types'
import { Atlas } from '../loaders/Atlas'
import { Audio } from '../loaders/Audio'
import { Conversations } from '../loaders/Conversations'
import { Font } from '../loaders/Font'
import { Spritesheets } from '../loaders/Spritesheets'
import { Tilemaps } from '../loaders/Tilemaps'

export class Assets {
    public audio: Audio = new Audio()
    public font: Font = new Font()
    public atlas: Atlas = new Atlas()
    public spritesheets: Spritesheets = new Spritesheets()
    public tilemaps: Tilemaps = new Tilemaps()
    public conversations: Conversations = new Conversations()

    public async load(): Promise<Loaded> {
        try {
            await this.atlas.load()
            await this.audio.load()
            await this.spritesheets.load()
            await this.tilemaps.load()
            await this.conversations.load()
            await this.font.load()

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
