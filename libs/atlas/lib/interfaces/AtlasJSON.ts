import { ISpritesheetData, ISpritesheetFrameData, utils } from 'pixi.js'

export interface AtlasFrame extends ISpritesheetFrameData {
    filename: string
}

export interface AtlasJSON extends ISpritesheetData {
    frames: utils.Dict<ISpritesheetFrameData>
    meta: {
        image: string
        scale: string
        related_multi_packs?: string[]
    }
}
