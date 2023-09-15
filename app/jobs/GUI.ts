import { Container, MIPMAP_MODES, Sprite, Texture } from "pixi.js";

export class GUI {
    private icons: Sprite[];
    public baseUnit: 32;
    public container: Container;

    constructor() {
        this.baseUnit = 32;
        this.container = new Container();
        this.icons = this.getIcons();
        this.container.width = window.innerWidth;
        this.container.height = window.innerHeight;
        this.container.addChild(...this.icons);
    }

    private getIcons() {
        const icons = ["StoneIcon.png", "GoldIcon.png", "WoodIcon.png"];

        return icons.map((icon: string, index: number) => {
            const texture = Texture.from(icon, {
                width: 16,
                height: 16,
                mipmap: MIPMAP_MODES.POW2
            });

            const sprite = new Sprite(texture);

            sprite.position.x = index * 80;
            sprite.position.y = 16;
            sprite.height = 16;
            sprite.width = 16;

            return sprite;
        })
    }
}