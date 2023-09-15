import { Debug } from '@shared/debug'
import { Loaded } from 'preload/core/types'

export abstract class Loader<T> {
    public data: Record<string, T> = {}

    public async load(): Promise<Loaded> {
        Debug.logger.log('Load method has not been overriden.')

        return {
            success: false
        }
    }

    public get(key: string): T {
        return this.data[key]
    }

    public set(key: string, value: T): void {
        this.data[key] = value
    }
}
