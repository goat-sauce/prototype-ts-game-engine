import { Vector2 } from '@shared/helpers'
import { v4 as uuidv4 } from 'uuid'

export class Node {
    public ref: string = uuidv4()
    public position: Vector2

    public constructor(position: Vector2) {
        this.position = position
    }
}
