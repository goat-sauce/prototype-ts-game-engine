import { Container, DisplayObject, Sprite } from "pixi.js";

export abstract class Job {
    public key: string;
    public container: Container;

    public complete(container: Container): DisplayObject {
        return container;
    }
}