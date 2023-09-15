import { GameObject } from '@preload/tasks'

export class Runner {
    public async render(tasks: GameObject<unknown>[]): Promise<void> {
        for (const task of tasks) {
            const render = await task.render()
            task.register(task, render)
        }
    }

    public async setup(tasks: GameObject<unknown>[]): Promise<void> {
        for (const task of tasks) {
            const render = await task.render()
            task.register(task, render)
            task.inject(render)
        }
    }
}
