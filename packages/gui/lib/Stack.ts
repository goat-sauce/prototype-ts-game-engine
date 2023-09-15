import { Container, Renderer, Sprite } from "pixi.js";

export class Stack {
    public container: Container<Sprite>;

    constructor(displayObjects: Sprite[], renderer: Renderer) {
        this.container = new Container<Sprite>();
        this.container.addChild(...displayObjects);
        this.position(renderer);
    }

    public position(renderer: Renderer) {
        const padding = 16;
        let position = 0;

        for (const child of this.container.children) {
            this.container.width = child.width > this.container.width ? child.width : this.container.width;
            child.transform.position.y = position;
            position += child.height + padding;
        }

        this.container.x = renderer.screen.width / 2;
        this.container.y = renderer.screen.height / 2;
        this.container.pivot.x = this.container.width / 2;
        this.container.pivot.y = this.container.height / 2;

    }
}