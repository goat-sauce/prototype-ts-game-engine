import { Action } from '@package/actions'

export class Runner {
  public async work(actions: Action[]) {
    for (const action of actions) {
      action.complete()
    }
  }
}
