import { Vector2 } from '@package/utils'

export class Node {
    public key: string
    public position: Vector2
    public filename: string

    constructor(key: string, position: Vector2, filename: string) {
        this.key = key;
        this.position = position;
        this.filename = filename;
    }
}
