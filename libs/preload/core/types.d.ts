import { GameObject } from '@preload/game'
import { Container, ISpritesheetData, ISpritesheetFrameData, utils } from 'pixi.js'

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

export type TilemapJSON = {
    key: string
    x: number
    y: number
    spritesheet: string
    collisions: Collision[]
}

export type ConversationsJSON = string[]

export type Collision = {
    x: number
    y: number
    width: number
    height: number
}

export type Stage = Container

// export type RegisterGameObject<T extends GameObject<S>, S extends {}> = {
//     gameObject: T
//     render: DisplayObject
// }

export type InteractingGameObjects = [GameObject<any>, GameObject<any>]

export type Loaded = {
    success: boolean
}

export type Size = {
    width: number
    height: number
}
