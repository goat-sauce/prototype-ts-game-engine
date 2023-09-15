import { Task } from '@package/tasks'

export class Runner {
    public async work(tasks: Task<any>[]): Promise<void> {
        for (const task of tasks) {
            const render = await task.render();
            task.register(task, render)
            task.inject(render)
        }
    }
}
