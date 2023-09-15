import { Debug } from '@shared/debug'
import { Channels } from '@shared/channels'
import { Engine } from '../Engine'
import { Errors } from '../Errors'
import { Loader } from './abstract/Loader'
import { Loaded } from 'preload/core/types'

export class Audio extends Loader<Buffer> {
    public data: Record<string, Buffer> = {}

    public async load(): Promise<Loaded> {
        try {
            this.data = await Engine.IPC.invoke<Record<string, Buffer>>(Channels.audio.get)
            if (!Object.keys(this.data).length) throw Errors.NoAudio

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
