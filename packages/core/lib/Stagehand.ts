import { Job } from "jobs/lib/abstract/Job";
import { Container, DisplayObject } from "pixi.js";

export class Stagehand {
    public static Work(jobs: Job[], container: Container): DisplayObject[] {
        const output = [];

        for (const job of jobs) {
            output.push(job.complete(container));
        }

        return output;
    }
}