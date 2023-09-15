import { World } from 'p2'

export class Physics {
    public world: World = new World({
        gravity: [0, 0]
        // gravity: [0, 0.25]
    });
}
