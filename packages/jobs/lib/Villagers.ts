import * as Core from "@package/core";
import { Container } from "pixi.js";
import { Job } from "./abstract/Job";

export class Villagers extends Job {
    public override complete(container: Container) {
        const villager = new Core.Actor({
            position: new Core.Vector2(0, 0),
            texture: 'assets/sprites/actors/Villager.png',
            width: 18,
            height: 19
        });

        return container.addChild(villager.sprite);
    }
}