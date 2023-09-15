import { GameObject } from '@preload/game'
import { Container } from 'pixi.js'

export type Stage = Container
export type InteractingGameObjects = [GameObject<any>, GameObject<any>]
export type Loaded = { success: boolean }
export type Size = { width: number, height: number }
