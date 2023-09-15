import { Memory } from '@package/memory'
import { RegisterTask } from 'core/types'

export class Registry extends Memory {
    public override store: Map<string, RegisterTask<any>> = new Map()

    public search<S extends {}>(tag: string): RegisterTask<S> | undefined {
        return Array.from(this.store.values()).find((register: RegisterTask<S>) => {
            if (register.task.tags.includes(tag)) return register
        })
    }
}
