import { Client } from '@package/core'
import { Debug } from '@package/debug'
import { Container, DisplayObject } from 'pixi.js'
import { v4 as uuidv4 } from 'uuid'
import { State } from '../classes/State'

export abstract class Task<S> {
    public ref: string = uuidv4()
    public tags: string[] = ['default']
    public state: State<S> = new State(this.ref)

    constructor(state: S) {
        this.state.obj = state;
    }

    public async render(state = this.state): Promise<DisplayObject> {
        Debug.Logger.log({ status: 'rendered' })
        return new Container()
    }

    public async inject(object: DisplayObject) {
        // Debug.Logger.log({ status: 'injected', object })
        Client.Engine.stage.container.addChild(object)
    }

    public register(task: Task<S>, rendered?: DisplayObject) {
        Client.Engine.registry.set(task.ref, { task, rendered })
        Debug.Logger.log({ status: 'registered', ref: this.ref, tags: this.tags })
    }

    public destroy() {
        Client.Engine.registry.delete(this.ref)
        Debug.Logger.log({ status: 'destroyed', ref: this.ref, tags: this.tags })
    }
}
