import * as Core from "@package/core";
import { Client } from "@package/core";
import { Job } from "./abstract/Job";

export class Stone extends Job {
    public override complete() {
        const stone = new Core.Prop({ position: new Core.Vector2(3, 3) });
        return Client.stage.addChild(stone.sprite);
    }
}