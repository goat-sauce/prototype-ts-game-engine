import { Client, Graph, Vector2 } from "@package/core";
import { Job } from "./abstract/Job";

export class Floor extends Job {
    public override complete() {
        const floor = new Graph(new Vector2(100, 100));
        return Client.stage.addChild(floor.container);
    }
}