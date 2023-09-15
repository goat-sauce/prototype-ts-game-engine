export class State<S> {
    public bag: S = {} as S
    public ref: string

    public constructor(ref: string) {
        this.ref = ref
    }

    public get(key: keyof S): S[keyof S] | null {
        if (!this.bag) return null
        const value = this.bag[key]
        return value ? value : null
    }

    public set(state: Partial<S>): void {
        if (!this.bag) return
        this.bag = Object.assign(this.bag, state)

        const event = new CustomEvent('state:update', {
            detail: {
                ref: this.ref
            }
        })

        document.dispatchEvent(event)
    }
}
