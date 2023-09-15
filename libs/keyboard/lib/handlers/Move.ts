import { Client } from '@package/core'
import { Vector2 } from '@package/entities'

export class Move {
    private static Speed = 0.25

    public up(): void {
        const player = Client.Engine.registry.search<{ animation: string; position: Vector2 }>('player')
        const delta = Client.Engine.ticker.deltaMS

        if (player && player.render) {
            player.task.state.set({
                animation: 'up',
                position: new Vector2(player.render.position.x, (player.render.position.y -= Move.Speed * delta))
            })
        }
    }

    public down(): void {
        const player = Client.Engine.registry.search<{ animation: string; position: Vector2 }>('player')
        const delta = Client.Engine.ticker.deltaMS

        if (player && player.render) {
            player.task.state.set({
                animation: 'down',
                position: new Vector2(player.render.position.x, (player.render.position.y += Move.Speed * delta))
            })
        }
    }

    public left(): void {
        const player = Client.Engine.registry.search<{ animation: string; position: Vector2 }>('player')
        const delta = Client.Engine.ticker.deltaMS

        if (player && player.render) {
            player.task.state.set({
                animation: 'left',
                position: new Vector2((player.render.position.x -= Move.Speed * delta), player.render.position.y)
            })
        }
    }

    public right(): void {
        const player = Client.Engine.registry.search<{ animation: string; position: Vector2 }>('player')
        const delta = Client.Engine.ticker.deltaMS

        if (player && player.render) {
            player.task.state.set({
                animation: 'right',
                position: new Vector2((player.render.position.x += Move.Speed * delta), player.render.position.y)
            })
        }
    }
}
