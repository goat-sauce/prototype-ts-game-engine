import { Debug } from '@package/debug'
import { TilemapJSON } from 'core/types'
import { Client } from '../Client'

export class Tilemaps {
    public data: Record<string, TilemapJSON[][]> = {}

    public async load(): Promise<void> {
        try {
            const tilemaps = await Client.Engine.IPC.invoke<Record<string, TilemapJSON[][]>>('tilemaps:get')
            if (tilemaps) this.data = tilemaps
        } catch (error) {
            Debug.logger.error(error)
        }
    }
}
