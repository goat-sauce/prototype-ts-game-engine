import { Client } from '@package/core'
import { Debug } from '@package/debug'
import { Container, DisplayObject } from 'pixi.js'
import { v4 as uuidv4 } from 'uuid'
import { State } from '../classes/State'

export abstract class Task<S> {
    public ref: string = uuidv4()
    public tags: string[] = ['default']
    public state: State<S> = new State(this.ref)

    public constructor(state: S) {
        this.state.bag = state
    }

    public async setup(state = this.state): Promise<DisplayObject> {
        Debug.logger.log({ status: 'setup', state })
        return new Container()
    }

    public async render(state = this.state): Promise<DisplayObject> {
        Debug.logger.log({ status: 'rendered', state })
        return new Container()
    }

    public async inject(object: DisplayObject): Promise<void> {
        Client.Engine.stage.container.addChild(object)
    }

    public register(task: Task<S>, render: DisplayObject): void {
        Client.Engine.registry.set(task.ref, { task, render })
    }

    public destroy(): void {
        Client.Engine.registry.delete(this.ref)
    }
}
