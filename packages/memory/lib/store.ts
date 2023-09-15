export class Memory {
    public static store = {}

    public get(key: string) {
        return Memory.store[key]
    }

    public set(key: string, value: string) {
        Memory.store[key] = value
    }

    public delete(key: string) {
        delete Memory.store[key]
    }
}
