import { Debug } from '@shared/debug'
import { Channels } from '@shared/channels'
import { Engine } from '../Engine'
import { Errors } from '../Errors'
import { Loader } from './abstract/Loader'
import { Loaded } from 'preload/core/types'
import { Packer } from 'preload/core'

export class Tilemaps extends Loader<Packer.TilemapJSON[][]> {
    public data: Record<string, Packer.TilemapJSON[][]> = {}

    public async load(): Promise<Loaded> {
        try {
            this.data = await Engine.IPC.invoke<Record<string, Packer.TilemapJSON[][]>>(Channels.tilemaps.get)
            if (!Object.keys(this.data).length) throw Errors.NoTilemaps

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
