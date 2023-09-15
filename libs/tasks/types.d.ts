import { Vector2 } from '@package/entities'
import { FederatedPointerEvent } from 'pixi.js'

export type TaskOptions = {
    event?: FederatedPointerEvent | null
}

export type PlayerState = {
    animation: string
    position: Vector2
}
