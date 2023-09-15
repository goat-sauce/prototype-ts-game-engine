import { GameObject } from '@preload/game'

export class Queue {
    public gameObjects: Set<GameObject<any>> = new Set()
}
