import { Client } from '../Client'
import { Chunk, Vector2 } from '@package/entities'
import { Container, Sprite } from 'pixi.js'

export class Painter {
    public async paint(chunks: Record<string, Chunk>): Promise<void> {
        for (const chunk of Object.values(chunks)) {
            const container = new Container()

            for (const node of Object.values(chunk.graph.nodes)) {
                const spritesheet = Client.Engine.atlases.spritesheets.get('grass')
                if (!spritesheet) continue
                const sprite = new Sprite(spritesheet.textures['grass-0'])
                const position = Vector2.normalize(node.position)
                const offset = Vector2.normalize(chunk.position)
                sprite.position.x = offset.x + position.x
                sprite.position.y = offset.y + position.y
                container.addChild(sprite)
            }

            Client.Engine.stage.container.addChild(container)
        }
    }
}
