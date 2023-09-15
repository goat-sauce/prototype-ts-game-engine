import { Client } from '@package/core';
import { Button, Stack } from '@package/gui';
import { Action } from './abstract/Action';

export class Start extends Action {
    public override complete() {
        const buttons = [
            new Button({ text: 'Start' }).sprite,
            new Button({ text: 'Settings' }).sprite,
            new Button({ text: 'Quit' }).sprite
        ]

        return Client.stage.addChild(new Stack(buttons, Client.renderer).container)
    }
}