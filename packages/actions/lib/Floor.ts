import { Client, Graph, Vector2 } from "@package/core";
import { Action } from "./abstract/Action";

export class Floor extends Action {
    public override complete() {
        const floor = new Graph(new Vector2(100, 100));
        return Client.stage.addChild(floor.container);
    }
}