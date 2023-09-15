import { Action } from '@package/actions'

export class Stagehand {
  public work(actions: Action[]) {
    for (const action of actions) {
      action.complete()
    }
  }
}
