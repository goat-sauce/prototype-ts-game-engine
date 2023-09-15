import { Container, DisplayObject } from "pixi.js";

export class Stack {
    public container: Container;

    constructor(displayObjects: DisplayObject[]) {
        this.container = new Container();
        this.container.addChild(...displayObjects);
        this.position();
    }

    public position() {
        console.log(this.container.children.entries());
    }
}