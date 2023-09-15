import { Engine, Packer } from '@preload/core'
import { Debug } from '@shared/debug'
import { Channels } from '@shared/channels'
import { Errors } from '../Errors'
import { Loader } from './abstract/Loader'
import { Loaded } from 'preload/core/types'

export class Atlas extends Loader<Packer.AtlasJSON> {
    public data: Record<string, Packer.AtlasJSON> = {}

    public async load(): Promise<Loaded> {
        try {
            this.data = await Engine.IPC.invoke<Record<string, Packer.AtlasJSON>>(Channels.atlas.get)
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
