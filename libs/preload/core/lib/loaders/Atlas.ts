import { Engine } from '@preload/core'
import { Debug } from '@shared/debug'
import { Channels } from '@shared/channels'
import { Errors } from '../Errors'
import { Loader } from './abstract/Loader'
import { AtlasJSON, Loaded } from 'preload/core/types'

export class Atlas extends Loader<AtlasJSON> {
    public data: Record<string, AtlasJSON> = {}

    public async load(): Promise<Loaded> {
        try {
            this.data = await Engine.IPC.invoke<Record<string, AtlasJSON>>(Channels.atlas.get)
            if (!Object.keys(this.data).length) throw Errors.NoAtlas

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
