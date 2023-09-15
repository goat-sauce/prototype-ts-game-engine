export class Memory<K, T> {
    public store: Map<K, T> = new Map()

    public get(key: K): T | null {
        if (!this.store.get(key)) return null
        return this.store.get(key) as T
    }

    public set(key: K, value: T): T {
        this.store.set(key, value)
        return this.store.get(key) as T
    }

    public delete(key: K): void {
        this.store.delete(key)
    }
}
