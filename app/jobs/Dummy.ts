import { DisplayObject } from "pixi.js";
import { Job } from "../abstract/Job";

export class Dummy extends Job {
    public override complete(): DisplayObject {
        console.info("Ran dummy job.")
        return this.container;
    }
}
