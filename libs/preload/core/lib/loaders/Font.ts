import { Debug } from '@shared/debug'
import { Channels } from '@shared/channels'
import { Engine } from '../Engine'
import { Loader } from './abstract/Loader'
import { Loaded } from 'preload/core/types'
import { Errors } from '../Errors'
import { Assets } from 'pixi.js'
import { parse } from 'path'

export class Font extends Loader<boolean> {
    public data: Record<string, boolean> = {}

    public async load(): Promise<Loaded> {
        try {
            const fonts = await Engine.IPC.invoke<string[]>(Channels.fonts.get)

            if (!fonts.length) throw Errors.NoFonts

            for (const font of fonts) {
                const parsed = parse(font)
                this.data[parsed.name] = await Assets.load(font)
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
