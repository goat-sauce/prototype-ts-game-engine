import { Client } from '@package/core';
import { Button, Stack } from '@package/gui';
import { Job } from "./abstract/Job";

export class Start extends Job {
    public override complete() {
        const buttons = [
            new Button({ text: 'Start' }).sprite,
            new Button({ text: 'Settings' }).sprite,
            new Button({ text: 'Quit' }).sprite
        ]

        return new Stack(buttons, Client.renderer).container
    }
}