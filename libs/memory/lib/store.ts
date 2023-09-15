export class Memory {
    public static store: Map<string, unknown> = new Map();

    public get<T>(key: string): Map<string, T> {
        return Memory.store.get(key) as Map<string, T>;
    }

    public set(key: string, value: string): void {
        if (this.get(key)) throw 'Exists'
        Memory.store[key] = value
    }

    public delete(key: string): void {
        delete Memory.store[key]
    }
}
