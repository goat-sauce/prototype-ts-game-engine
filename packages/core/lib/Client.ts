import * as Jobs from "@package/jobs";
import { Container, Renderer, Ticker } from "pixi.js";
import { Stagehand } from "./Stagehand";
import { Keyboard } from "@package/keyboard";
import { config } from "@package/config";

config.renderer();

export class Client {
    public renderer: Renderer;
    public ticker: Ticker;
    public stage: Container;
    private view: HTMLCanvasElement;
    private keyboard: Keyboard;

    constructor() {
        this.renderer = new Renderer({ width: 640, height: 360, resolution: 2 });
        this.stage = new Container();
        this.ticker = new Ticker();
        this.keyboard = new Keyboard();
        this.view = this.renderer.view as unknown as HTMLCanvasElement
    }

    public setup() {
        document.body.append(this.view);
        document.addEventListener('keydown', this.keyboard.add)
        document.addEventListener('keyup', this.keyboard.remove)
    }

    public delegate(jobs: Jobs.Job[]) {
        this.stage.addChild(...Stagehand.Work(jobs, this.stage));
    }

    public resize() {
        this.view.height = window.innerHeight;
        this.view.width = window.innerWidth;
    }

    public state() {
        this.renderer.render(this.stage);
        this.keyboard.handler(this, Keyboard.codes);
    }
}