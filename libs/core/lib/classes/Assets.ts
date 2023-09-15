import { Debug } from '@package/debug'
import { Loaded } from 'core/types'
import { Assets as AssetsPIXI } from 'pixi.js'
import { Client } from '../Client'
import { Errors } from '../Errors'

export class Assets {
    public async load(): Promise<Loaded> {
        try {
            const assets = await Client.Engine.IPC.invoke<string[]>('assets:get')

            if (!assets) throw Errors.NoAssets

            for (const asset of assets) {
                await AssetsPIXI.load(asset)
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
