import { config } from "@package/config";
import { Debug } from "@package/core";
import { Container, Sprite, Text, Texture } from "pixi.js";

type ButtonOptions = {
    text: string;
}

export class Button {
    public container: Container;
    public texture: Texture;
    public sprite: Sprite;
    public text: Text;

    constructor(buttonOptions: ButtonOptions) {
        this.sprite = new Sprite(Texture.from('assets/sprites/gui/button.png', {
            width: 128,
            height: 32
        }))

        this.sprite.width = 64;
        this.sprite.height = 16;
        this.text = new Text('START', { fontFamily: 'pixel', fontSize: 12 });
        this.text.anchor.x = 0.5;
        this.text.anchor.y = 0.5;
        this.text.transform.position.x = this.sprite.width;
        this.text.transform.position.y = this.sprite.height;
        this.sprite.addChild(this.text);
        
        if (config.debug) Debug.anchor(this.text);
    }
}