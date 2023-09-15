export class Memory {
    public static store: Map<string, unknown> = new Map()

    public get<T>(key: string): T | null {
        if (!Memory.store.get(key)) return null
        return Memory.store.get(key) as T
    }

    public set<T>(key: string, value: T): T {
        Memory.store.set(key, value)
        return Memory.store.get(key) as T
    }

    public delete(key: string): void {
        Memory.store.delete(key)
    }
}
