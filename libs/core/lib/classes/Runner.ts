import { Atlas } from '@package/atlas'
import { Vector2 } from '@package/entities'
import { Task } from '@package/tasks'
import { Container, Sprite } from 'pixi.js'
import { Chunk } from '../../../../app/main/classes/Chunk'
import { Client } from '../Client'

export class Runner {
    public async work(tasks: Task<any>[]) {
        for (const task of tasks) {
            task.register(task)
            const object = await task.render()
            task.register(task, object)
            task.inject(object)
        }
    }
}

export class Painter {
    public async paint(chunks: Record<string, Chunk>) {
        for (const chunk of Object.values(chunks)) {
            const container = new Container()

            for (const node of Object.values(chunk.graph.nodes)) {
                const sprite = new Sprite(Client.Engine.atlases.spritesheets['grass'].textures['grass-0']);
                const position = Vector2.normalize(node.position.x, node.position.y);
                const offset = Vector2.normalize(chunk.position.x, chunk.position.y)
                sprite.position.x = offset.x + position.x
                sprite.position.y = offset.y + position.y
                container.addChild(sprite)
            }

            Client.Engine.stage.container.addChild(container)
        }
    }
}
