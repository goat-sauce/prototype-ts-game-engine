import * as GUI from '@package/gui';
import { Container } from "pixi.js";
import { Job } from "./abstract/Job";

export class Start extends Job {
    public override complete(container: Container) {
        const stack = new GUI.Stack();

        const buttons = {
            start: new GUI.Button({ text: 'Start' }),
            settings: new GUI.Button({ text: 'Settings' }),
            quit: new GUI.Button({ text: 'Quit' })
        }

        return new GUI.Stack(buttons).container
    }
}