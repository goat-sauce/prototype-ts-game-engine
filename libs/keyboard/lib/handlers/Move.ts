import { Client } from '@package/core'
import { Vector2 } from '@package/helpers'

export class Move {
    public speed = 0.25
    public up(): void { this.handle('up') }
    public down(): void { this.handle('down') }
    public left(): void { this.handle('left') }
    public right(): void { this.handle('right') }

    public calculate: Record<string, (position: Vector2) => Vector2> = {
        up: (position: Vector2) => new Vector2(position.x, (position.y -= this.speed * Client.Engine.ticker.deltaMS)),
        down: (position: Vector2) => new Vector2(position.x, (position.y += this.speed * Client.Engine.ticker.deltaMS)),
        left: (position: Vector2) => new Vector2((position.x -= this.speed * Client.Engine.ticker.deltaMS), position.y),
        right: (position: Vector2) => new Vector2((position.x += this.speed * Client.Engine.ticker.deltaMS), position.y)
    }

    public handle(animation: string): void {
        const player = Client.Engine.registry.search<{ animation: string; position: Vector2 }>('player')

        if (player && player.render) {
            const position = this.calculate[animation](player.render.position)
            player.task.state.set({ animation, position })
            Client.Engine.stage.center(new Vector2(-position.x, -position.y))
        }
    }
}
