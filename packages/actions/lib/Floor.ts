import { Client } from "@package/core";
import { Vector2 } from "@package/utils";
import { Tilemap } from "entities";
import { Action } from "./abstract/Action";

export class Floor extends Action {
    public override complete() {
        const floor = new Tilemap(new Vector2(100, 100));
        return Client.stage.addChild(floor.container);
    }
}