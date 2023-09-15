import { Container, DisplayObject } from "pixi.js";
import { Job } from "../abstract/Job";

export class Stagehand {
    public container: Container;

    constructor() {
        this.container = new Container();
    }

    public work(jobs: Job[]): DisplayObject[] {
        const output = [];

        for (const job of jobs) {
            output.push(job.complete());
        }

        return output;
    }
}