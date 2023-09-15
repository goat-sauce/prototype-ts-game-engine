import { Vector2 } from '@package/helpers'
import { FederatedPointerEvent } from 'pixi.js'

export type TaskOptions = {
    event?: FederatedPointerEvent | null
}

export type PlayerState = {
    animation: string
    position: Vector2
}

export type HouseState = {

}

export type Tile = {
    key: string
    x: number
    y: number
}
