export class Memory {
    public store: Map<string, unknown> = new Map()

    public get<T>(key: string): T | null {
        if (!this.store.get(key)) return null
        return this.store.get(key) as T
    }

    public set<T>(key: string, value: T): T {
        this.store.set(key, value)
        return this.store.get(key) as T
    }

    public delete(key: string): void {
        this.store.delete(key)
    }
}
