import { Container, Renderer, Ticker } from "pixi.js";
import { defaultSettings } from "../renderer.settings";
import { Job } from "../abstract/Job";
import { Stagehand } from "./Stagehand";
import { GUI } from "../jobs/GUI";
import { Jobs } from "../jobs";

export enum Keybinds {
    MoveCameraUp = 'KeyW',
    MoveCameraLeft = 'KeyA',
    MoveCameraDown = 'KeyS',
    MoveCameraRight = 'KeyD'
}

export class InputSet {
    static codes: Set<Keybinds> = new Set();

    public static add(event: KeyboardEvent) {
        InputSet.codes.add(event.code as Keybinds);
    }

    public static remove(event: KeyboardEvent) {
        InputSet.codes.delete(event.code as Keybinds)
    }
}

export class Input {
    private static speed: number = 5;

    public handler(game: Game, inputSet: Set<string>) {
        for (const input of inputSet.values()) {
            switch (input) {
                case Keybinds.MoveCameraUp:
                    this.handleMoveCameraUp(game);
                    break;
                case Keybinds.MoveCameraDown:
                    this.handleMoveCameraDown(game);
                    break;
                case Keybinds.MoveCameraLeft:
                    this.handleMoveCameraLeft(game);
                    break;
                case Keybinds.MoveCameraRight:
                    this.handleMoveCameraRight(game);
                    break;
            }
        }
    }

    public handleMoveCameraUp(game: Game) {
        game.stage.position.y += Input.speed;
    }

    public handleMoveCameraDown(game: Game) {
        game.stage.position.y -= Input.speed;
    }

    public handleMoveCameraLeft(game: Game) {
        game.stage.position.x += Input.speed;
    }

    public handleMoveCameraRight(game: Game) {
        game.stage.position.x -= Input.speed;
    }
}

export class Game {
    public renderer: Renderer;
    public container: Container;
    public ticker: Ticker;
    public stage: Container;
    public input: Input;
    public gui: GUI;
    private view: HTMLCanvasElement;

    constructor() {
        this.renderer = new Renderer({ width: 640, height: 360, resolution: 2, antialias: false });
        this.stage = new Container();
        this.gui = new GUI();
        this.ticker = new Ticker();
        this.input = new Input();
        this.container = new Container();
        this.container.addChild(this.stage, this.gui.container);
        this.view = this.renderer.view as unknown as HTMLCanvasElement
    }

    public init() {
        defaultSettings();
        document.body.append(this.view);
        this.stage.x = this.renderer.screen.width / 2;
        this.stage.y = this.renderer.screen.height / 2;
    }

    public employ(jobs: Job[]) {
        const stagehand = new Stagehand();
        stagehand.container.addChild(...stagehand.work(jobs));
        this.stage.addChild(stagehand.container);
    }

    public resize() {
        this.view.height = window.innerHeight;
        this.view.width = window.innerWidth;
    }
}