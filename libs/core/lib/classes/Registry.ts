import { Memory } from '@package/memory'
import { Task } from '@package/tasks'
import { RegisterTask } from 'core/types'

export class Registry extends Memory {
    public override store: Map<string, RegisterTask<any, any>> = new Map()

    public search<T extends Task<S>, S extends {}>(tag: string): RegisterTask<T, S> | undefined {
        return Array.from(this.store.values()).find((register: RegisterTask<T, S>) => {
            if (register.task.tags.includes(tag)) return register
        })
    }
}
