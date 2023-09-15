import { Container, DisplayObject, Sprite } from "pixi.js";

export abstract class Job {
    public key: string;
    public container: Container;

    constructor() {
        this.container = new Container();
    }

    public complete(): DisplayObject {
        console.log('No DisplayObject, make sure you override the complete method in your child class.');
        return new Sprite();
    }
}