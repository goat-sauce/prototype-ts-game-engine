export class State<S extends {}> {
    public obj: S
    public ref: string;

    constructor(ref: string) {
        this.ref = ref;
    }

    public get(key: keyof S) {
        return this.obj[key]
    }

    private changed(state: Partial<S>) {
        let changed = false;

        for (const key of Object.keys(state)) {
            if (this.obj[key] !== state[key]) {
                changed = true
            }
        }
        return changed;
    }

    public set(state: Partial<S>) {
        if (this.changed(state)) {
            this.obj = { ...this.obj, ...state }

            const event = new CustomEvent('state:update', {
                detail: {
                    ref: this.ref
                }
            });

            document.dispatchEvent(event)
        }
    }
}