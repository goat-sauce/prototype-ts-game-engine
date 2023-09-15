import { Memory } from '@shared/memory'
import { GameObject } from '@preload/tasks'
import { RegisterGameObject } from 'preload/core/types'

export class Registry extends Memory {
    public override store: Map<string, RegisterGameObject<any, any>> = new Map()

    public search<T extends GameObject<S>, S extends {}>(tag: string): RegisterGameObject<T, S> | undefined {
        return Array.from(this.store.values()).find((register: RegisterGameObject<T, S>) => {
            if (register.task.tags.includes(tag)) return register
        })
    }
}
