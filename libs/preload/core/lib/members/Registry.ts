import { Memory } from '@shared/memory'
import { GameObject } from '@preload/game'

export class Registry {
    public gameObjects: Memory<string, GameObject<any>> = new Memory()
    public bodies: Memory<number, string> = new Memory()

    public search<T extends GameObject<S>, S extends {}>(tag: string): T | null {
        for (const ob of this.gameObjects.store.values()) {
            if (ob.tags.includes(tag)) return ob as T
        }

        return null
    }
}
