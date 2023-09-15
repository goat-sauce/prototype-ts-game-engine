import { Vector2 } from '@shared/helpers'
import { BodyOptions, BoxOptions } from 'p2'
import { FederatedPointerEvent } from 'pixi.js'

export type GameObjectOptions = {
    event?: FederatedPointerEvent | null
}

export type ZoneOptions = {
    ref?: string,
    position?: Vector2
    radius: number
}

export type PhysicsOptions = {
    position?: Vector2
    ref?: string
    body: BodyOptions
    box: BoxOptions
    zone?: ZoneOptions
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
    animation: 'idle',
    running: boolean
}

export type HouseState = {}

export type DialogBoxState = {
    conversation: string[],
    index: number
}

export type Layer = 'gui' | 'stage'

export type StartMenuState = {
    index: number
}
