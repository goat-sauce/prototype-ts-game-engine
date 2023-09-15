import { Client } from '@package/core'
import { Button, Stack } from '@package/gui'
import { Task } from './abstract/Task'

export class StartMenu extends Task {
    public override async complete() {
        const buttons = [new Button({ text: 'Start' }).sprite, new Button({ text: 'Settings' }).sprite, new Button({ text: 'Quit' }).sprite]
        const stack = new Stack(buttons, Client.Engine.renderer)
        return stack.container
    }
}
