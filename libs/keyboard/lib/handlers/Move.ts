import { config } from '@package/config';
import { Client } from '@package/core'
import { Vector2 } from '@package/entities';

export class Move {
    private static Speed = 0.25

    public async updateChunk() {
        const local = Vector2.localize(Client.Engine.stage.pointer.position.x, Client.Engine.stage.pointer.position.y)
        const width = config.world.x * config.chunk.size.x
        const height = config.world.y * config.chunk.size.y
        if (local.y < 0 || local.x < 0 || local.y >= height || local.x >= width) return;
        const current = new Vector2(local.x - (local.x % config.chunk.size.x), local.y - (local.y % config.chunk.size.y))
        const active = Client.Engine.state.get<Vector2>('activeChunkPosition')

        if (!Vector2.equal(current, active)) {
            const event = new CustomEvent('chunk:update', { detail: { position: current } })
            document.dispatchEvent(event)
        }
    }

    public up() {
        const player = Client.Engine.registry.search<{ animation: string, position: Vector2 }>('player')
        const delta = Client.Engine.ticker.deltaMS;

        if (player.rendered) {
            player.task.state.set({
                animation: 'up',
                position: new Vector2(player.rendered.position.x, player.rendered.position.y -= Move.Speed * delta)
            })
        }
    }

    public down() {
        const player = Client.Engine.registry.search<{ animation: string, position: Vector2 }>('player')
        const delta = Client.Engine.ticker.deltaMS;

        if (player.rendered) {
            player.task.state.set({
                animation: 'down',
                position: new Vector2(player.rendered.position.x, player.rendered.position.y += Move.Speed * delta)
            })
        }
    }

    public left() {
        const player = Client.Engine.registry.search<{ animation: string, position: Vector2 }>('player')
        const delta = Client.Engine.ticker.deltaMS;

        if (player.rendered) {
            player.task.state.set({
                animation: 'left',
                position: new Vector2(player.rendered.position.x -= Move.Speed * delta, player.rendered.position.y)
            })
        }
    }

    public right() {
        const player = Client.Engine.registry.search<{ animation: string, position: Vector2 }>('player')
        const delta = Client.Engine.ticker.deltaMS;

        if (player.rendered) {
            player.task.state.set({
                animation: 'right',
                position: new Vector2(player.rendered.position.x += Move.Speed * delta, player.rendered.position.y)
            })
        }
    }
} 