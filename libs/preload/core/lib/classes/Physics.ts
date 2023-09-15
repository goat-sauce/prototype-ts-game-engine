import { BeginContactEvent, EndContactEvent, World } from 'p2'

export class Physics {
    public ref: string = 'oranges'

    public world: World = new World({
        gravity: [0, 0]
    })

    public constructor() {
        this.eventListeners()
    }

    public beginContact(event: BeginContactEvent): void {
        event;
    }

    public endContact(event: EndContactEvent): void {
        event;
    }

    private eventListeners(): void {
        this.world.on('beginContact', this.beginContact.bind(this))
        this.world.on('endContact', this.endContact.bind(this))
    }
}
