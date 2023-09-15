import * as Core from "@package/core";
import { Container } from "pixi.js";
import { Job } from "./abstract/Job";

export class Floor extends Job {
    public override complete(container: Container) {
        const floor = new Core.Graph(new Core.Vector2(100, 100));
        return container.addChild(floor.container);
    }
}