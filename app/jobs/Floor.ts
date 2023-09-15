import { Job } from "../abstract/Job";
import { Graph } from "../classes/Graph";
import { Vector2 } from "../classes/Vector2";

export class Floor extends Job {
    override complete() {
        const floor = new Graph(new Vector2(14, 8));
        this.container.addChild(floor.container);
        return this.container;
    }
}