import { Vector2 } from '@shared/helpers'
import { BodyOptions, BoxOptions, CircleOptions } from 'p2'
import { FederatedPointerEvent } from 'pixi.js'

export type GameObjectOptions = {
    event?: FederatedPointerEvent | null
}

export type ZoneOptions = {
    ref?: string
    position?: Vector2
    radius: number
}

export namespace PhysicsOptions {
    export type Base = {
        position: Vector2
        ref: string
        body: BodyOptions
    }

    export interface Box extends Base {
        box?: BoxOptions
    }

    export interface Circle extends Base {
        circle?: CircleOptions
    }

    export interface Zone extends Base {
        zone?: ZoneOptions
    }

    export interface Point extends Base {
        point?: BoxOptions
    }

    export interface Polygon extends Base { }
}




export type ActorOptions = {
    spritesheet: string
    ref: string
    spawn: Vector2
    animation: string
    static?: boolean
    zone?: ZoneOptions
}

export type PlayerState = {
    animation: string
    spawn: Vector2
}

export type NpcState = {
    spawn: Vector2
    animation: 'idle'
    running: boolean
}

export type HouseState = {}

export type DialogBoxState = {
    conversation: string[]
    index: number
}

export type Layer = 'gui' | 'stage'

export type StartMenuState = {
    index: number
}
