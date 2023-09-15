import * as Core from "@package/core";
import { Container } from "pixi.js";
import { Job } from "./abstract/Job";

export class Stone extends Job {
    public override complete(container: Container) {
        const stone = new Core.Prop({ position: new Core.Vector2(3, 3) });
        return container.addChild(stone.sprite);
    }
}