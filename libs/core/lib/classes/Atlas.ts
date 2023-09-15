import { BaseTexture, Spritesheet } from 'pixi.js'
import { Client } from '@package/core'
import { Debug } from '@package/debug'
import { AtlasJSON, Loaded } from 'core/types'
import { Errors } from '../Errors'
import { DefaultMap } from '@package/helpers'

export class Atlas {
    public spritesheet: Spritesheet = new Spritesheet(new BaseTexture(), { frames: {}, meta: { scale: '1' } })
    public spritesheets: DefaultMap<Spritesheet> = new DefaultMap<Spritesheet>(this.spritesheet)

    public async load(): Promise<Loaded> {
        try {
            const atlases = await Client.Engine.IPC.invoke<Record<string, AtlasJSON>>('atlas:get')

            if (!atlases) throw Errors.NoAtlas

            for (const [key, atlas] of Object.entries(atlases)) {
                const spritesheet = new Spritesheet(BaseTexture.from(atlas.meta.image), atlas)
                await spritesheet.parse()
                this.spritesheets.set(key, spritesheet)
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
