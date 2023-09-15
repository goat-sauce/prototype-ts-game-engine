import { Task } from '@package/tasks'
import { Container, DisplayObject, ISpritesheetData, ISpritesheetFrameData, utils } from 'pixi.js'

export interface AtlasFrame extends ISpritesheetFrameData {
    filename: string
}

export interface AtlasJSON extends ISpritesheetData {
    frames: utils.Dict<ISpritesheetFrameData>
    meta: {
        image: string
        key: string
        scale: string
        related_multi_packs?: string[]
    }
}

export type Collision = {
    x: number,
    y: number,
    width: number,
    height: number
}

export type TilemapJSON = {
    key: string
    x: number
    y: number
    spritesheet: string
    collisions: Collision[]
}

export type Stage = Container

export type RegisterTask<T extends Task<S>, S extends {}> = {
    task: T,
    render: DisplayObject
}

export type Loaded = {
    success: boolean
}

export type Size = {
    width: number
    height: number
}
