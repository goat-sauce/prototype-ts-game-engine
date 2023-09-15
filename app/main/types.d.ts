import { Chunk } from '@package/entities'

export type Save = {
    success: boolean
}

export type Load = {
    chunks: Record<string, Chunk>
}
