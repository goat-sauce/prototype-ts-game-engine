import { Client } from "@package/core";
import { Vector2 } from "@package/utils";
import { Actor } from "entities";
import { FederatedPointerEvent } from "pixi.js";
import { Action } from "./abstract/Action";

type VillagerOptions = { position: Vector2, event: FederatedPointerEvent };

export class Villager extends Action {
    public options: VillagerOptions;

    constructor(options?: VillagerOptions) {
        super(options);
    }

    public override complete() {
        const villager = new Actor({
            position: this.options?.position ? this.options.position : new Vector2(0,0),
            texture: 'assets/sprites/actors/Villager.png',
            width: 18,
            height: 19
        });

        return Client.stage.addChild(villager.sprite);
    }
}