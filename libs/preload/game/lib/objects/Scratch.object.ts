import { GameObject } from '../classes/GameObject'

export class Scratch extends GameObject<{}> {

    public constructor(state: {}) {
        super(state)
        console.log('loaded')
    }
}
