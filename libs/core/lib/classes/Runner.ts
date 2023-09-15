import { config } from '@package/config'
import { Debug } from '@package/debug'
import { Task } from '@package/tasks'
import { BaseTexture, Container, Sprite, Spritesheet, Texture } from 'pixi.js'
import { Chunk } from '../../../../app/main/classes/Chunk'
import { Client } from '../Client'
import atlas from '../../../../build/assets/sprites/tiles/base/atlas.json'

export class Runner {
    public async work(tasks: Task[]) {
        for (const task of tasks) {
            const object = await task.complete()

            Debug.Logger.log({
                status: 'complete',
                ref: task.ref
            })

            task.inject(object)
        }
    }

    public async load(chunks: Chunk[]) {
        for (const chunk of chunks) {
            const container = new Container()
            console.log(chunk.position)
            container.position.x = chunk.position.x * config.baseUnit
            container.position.y = chunk.position.y * config.baseUnit

            for (const node of chunk.nodes.values()) {
                const spritesheet = new Spritesheet(BaseTexture.from(atlas.meta.image), atlas)
                await spritesheet.parse()
                const sprite = new Sprite(spritesheet.textures['Grass-0'])
                sprite.position.x = (node.position.x * config.baseUnit)
                sprite.position.y = (node.position.y * config.baseUnit)
                container.addChild(sprite)
            }

            Client.Engine.stage.addChild(container)
        }
    }
}
