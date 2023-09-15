import { BeginContactEvent, EndContactEvent, World } from 'p2'
import { InteractingGameObjects } from 'preload/core/types'
import { Engine } from '../Engine'

export class Physics {
    public ref: string = 'oranges'
    public static interaction: Map<string, InteractingGameObjects> = new Map()
    public world: World = new World({ gravity: [0, 0] })

    public constructor() {
        this.eventListeners()
    }

    public getInteractingGameObjects(event: BeginContactEvent | EndContactEvent): InteractingGameObjects | null {
        const objectARef = Engine.registry.bodies.get(event.bodyA.id)
        const objectBRef = Engine.registry.bodies.get(event.bodyB.id)
        const objectA = objectARef ? Engine.registry.gameObjects.get(objectARef) : null
        const objectB = objectBRef ? Engine.registry.gameObjects.get(objectBRef) : null
        if (objectA && objectB) return [objectA, objectB]
        return null
    }

    public getInteractingGameObjectsKey(event: BeginContactEvent | EndContactEvent): string {
        return `${event.bodyA.id}-${event.bodyB.id}`
    }

    public beginContact(event: BeginContactEvent): void {
        const interactingGameObjects = this.getInteractingGameObjects(event)
        const key = this.getInteractingGameObjectsKey(event)
        if (interactingGameObjects) Physics.interaction.set(key, interactingGameObjects)
    }

    public endContact(event: EndContactEvent): void {
        const key = this.getInteractingGameObjectsKey(event)
        Physics.interaction.delete(key)
    }

    private eventListeners(): void {
        this.world.on('beginContact', this.beginContact.bind(this))
        this.world.on('endContact', this.endContact.bind(this))
    }
}
