import { Vector2 } from '@shared/helpers'
import { BodyOptions, BoxOptions } from 'p2'
import { FederatedPointerEvent } from 'pixi.js'

export type GameObjectOptions = {
    event?: FederatedPointerEvent | null
}

export type ZoneOptions = {
    radius: number
}

export type PhysicsOptions = {
    position?: Vector2
    body: BodyOptions
    box: BoxOptions
    zone?: ZoneOptions
}

export type ActorOptions = {
    spritesheet: string
    spawn: Vector2
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
}

export type HouseState = {}
