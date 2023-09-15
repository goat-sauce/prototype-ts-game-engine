import { Task } from '@package/tasks'
import { Container, DisplayObject, ISpritesheetData, ISpritesheetFrameData, utils } from 'pixi.js'

export interface AtlasFrame extends ISpritesheetFrameData {
    filename: string
}

export interface AtlasJSON extends ISpritesheetData {
    tilemap?: TilemapJSON
    frames: utils.Dict<ISpritesheetFrameData>
    meta: {
        image: string
        key: string
        scale: string
        related_multi_packs?: string[]
    }
}

type TilemapJSON = {
    key: string
    x: number
    y: number
}

export type Stage = Container

export type RegisterTask<S extends {}> = {
    task: Task<S>
    render: DisplayObject
}

export type Loaded = {
    success: boolean
}

export type Size = {
    width: number
    height: number
}
