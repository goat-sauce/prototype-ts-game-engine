import { Client } from '@package/core'
import { Container, DisplayObject } from 'pixi.js'
import { uuid } from 'uuidv4';

export abstract class Task {
    public ref: string = uuid();

    public async complete(): Promise<DisplayObject> {
        return new Container()
    }

    public async inject(object: DisplayObject) {
        Client.Engine.stage.addChild(object)
    }
}
