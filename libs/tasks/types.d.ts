import { Vector2 } from '@package/helpers'
import { FederatedPointerEvent } from 'pixi.js'

export type TaskOptions = {
    event?: FederatedPointerEvent | null
}

export type PlayerState = {
    animation: string
    spawn: Vector2
}

export type HouseState = {

}
