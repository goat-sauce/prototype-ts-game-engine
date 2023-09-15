import { Debug } from '@shared/debug'
import { Channels } from '@shared/channels'
import { Assets as AssetsPIXI, BaseTexture, Spritesheet } from 'pixi.js'
import { Engine } from '../Engine'
import { Errors } from '../Errors'
import { Loader } from './abstract/Loader'
import { AtlasJSON, Loaded } from 'preload/core/types'

export class Spritesheets extends Loader<Spritesheet> {
    public data: Record<string, Spritesheet> = {}

    public async load(): Promise<Loaded> {
        try {
            const spritesheets = await Engine.IPC.invoke<string[]>(Channels.spritesheets.get)
            const atlases = await Engine.IPC.invoke<Record<string, AtlasJSON>>(Channels.atlas.get)

            if (!spritesheets) throw Errors.NoSpritesheets

            for (const asset of spritesheets) {
                await AssetsPIXI.load(asset)
            }

            for (const [key, atlas] of Object.entries(atlases)) {
                const spritesheet = new Spritesheet(BaseTexture.from(atlas.meta.image), atlas)
                await spritesheet.parse()
                this.data[key] = spritesheet
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
