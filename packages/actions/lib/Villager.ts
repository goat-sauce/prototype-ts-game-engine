import { Actor, Client, Vector2 } from "@package/core";
import { FederatedPointerEvent } from "pixi.js";
import { Job } from "./abstract/Job";

type VillagerOptions = { position: Vector2, event: FederatedPointerEvent };

export class Villager extends Job {
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

        villager.sprite.interactive = true;
        villager.sprite.on('clickcapture', () => {
            villager.sprite.destroy()
        })

        return Client.stage.addChild(villager.sprite);
    }
}