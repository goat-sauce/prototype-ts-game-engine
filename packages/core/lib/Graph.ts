import { Container } from "pixi.js";
import { Node } from "./Node";
import { Vector2 } from "./Vector2";

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