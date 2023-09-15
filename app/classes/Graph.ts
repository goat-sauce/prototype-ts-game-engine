import { Container, FederatedPointerEvent, MIPMAP_MODES, Sprite, Texture } from "pixi.js";
import { Vector2 } from "./Vector2";

export class Node {
    public key: string;
    public position: Vector2;
    public tile: Sprite;
    public tileHover: Sprite;
    public baseUnit: 32;
    public container: Container;

    constructor(key: string, position: Vector2) {
        this.key = key;
        this.position = position;
        this.baseUnit = 32;
        this.tile = this.getTile(this.getTexture("Grass.png"));
        this.tileHover = this.getSprite(this.getTexture('Select.png'));
        this.container = new Container();
        this.container.addChild(this.tile);
    }

    getTile(texture: Texture) {
        const sprite = this.getSprite(texture);

        sprite.interactive = true;
        sprite.on("mouseentercapture", (event: FederatedPointerEvent) => {
            this.handleMouseEnter(event)
        })

        sprite.on("mouseleavecapture", (event: FederatedPointerEvent) => {
            this.handleMouseLeave(event)
        })

        return sprite;
    }

    handleMouseEnter(event: FederatedPointerEvent) {
        this.container.addChild(this.tileHover);
    }

    handleMouseLeave(event: FederatedPointerEvent) {
        this.container.removeChild(this.tileHover);
    }

    getSprite(texture: Texture) {
        const sprite = new Sprite(texture);
        sprite.position.x = this.baseUnit * this.position.x;
        sprite.position.y = this.baseUnit * this.position.y;
        sprite.height = this.baseUnit;
        sprite.width = this.baseUnit;
        return sprite;
    }

    getTexture(filename: string) {
        return Texture.from(filename, {
            width: 32,
            height: 32,
            mipmap: MIPMAP_MODES.POW2,
        });
    }
}

export class Graph {
    private size: Vector2;
    public container: Container
    public nodes: Map<string, Node>;

    constructor(size: Vector2) {
        this.size = size;
        this.container = new Container();
        this.nodes = this.generate();
    }

    public key(position: Vector2) {
        return `${position.x}|${position.y}`;
    }

    private generate() {
        const nodes = new Map();

        const edges = {
            px: this.size.x / 2,
            nx: -(this.size.x / 2),
            py: this.size.y / 2,
            ny: -(this.size.y / 2)
        }

        for (let x = edges.nx; x < edges.px; x++) {
            for (let y = edges.ny; y < edges.py; y++) {
                const position = new Vector2(x, y);
                const key = this.key(position);
                const node = new Node(key, position);
                this.container.addChild(node.container);
                nodes.set(key, node);
            }
        }

        return nodes;
    }
}