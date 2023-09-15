import { Job } from '@package/actions'

export class Stagehand {
  public work(jobs: Job[]) {
    for (const job of jobs) {
      job.complete()
      //   job.store()
    }
  }
}
