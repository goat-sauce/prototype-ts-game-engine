import { Debug } from '@shared/debug'
import { Channels } from '@shared/channels'
import { Engine } from '../Engine'
import { Errors } from '../Errors'
import { Loader } from './abstract/Loader'
import { Loaded, TilemapJSON } from 'preload/core/types'

export class Tilemaps extends Loader<TilemapJSON[][]> {
    public data: Record<string, TilemapJSON[][]> = {}

    public async load(): Promise<Loaded> {
        try {
            this.data = await Engine.IPC.invoke<Record<string, TilemapJSON[][]>>(Channels.tilemaps.get)
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
