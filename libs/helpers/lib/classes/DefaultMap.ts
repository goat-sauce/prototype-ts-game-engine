export class DefaultMap<T> {
    public map: Map<string, T> = new Map()
    public value: T

    public constructor(value: T) {
        this.value = value
    }

    public get(key: string): T {
        let value = this.map.get(key)
        if (!value) return this.value
        return value
    }

    public set(key: string, value: T): void {
        this.map.set(key, value)
    }
}
