import { Client } from '@package/core'
import { Vector2 } from '@package/helpers'
import { Player } from '@package/tasks'
import { PlayerState } from 'tasks/types'

export class Move {
    public speed = 35
    public up(): void { this.handle('up') }
    public down(): void { this.handle('down') }
    public left(): void { this.handle('left') }
    public right(): void { this.handle('right') }

    // public calculate: Record<string, (player: Player) => Vector2> = {
    //     up: (player: Player) => player.player.body.velocity[0] -= this.speed * Client.Engine.ticker.deltaMS,
    //     down: (position: Vector2) => new Vector2(position.x, (position.y += this.speed * Client.Engine.ticker.deltaMS)),
    //     left: (position: Vector2) => new Vector2((position.x -= this.speed * Client.Engine.ticker.deltaMS), position.y),
    //     right: (position: Vector2) => new Vector2((position.x += this.speed * Client.Engine.ticker.deltaMS), position.y)
    // }

    public handle(animation: string): void {
        const player = Client.Engine.registry.search<Player, PlayerState>('player')

        if (player && player.render) {
            switch (animation) {
                case 'up':
                    player.task.player.body.velocity[1] = -this.speed
                    break;
                case 'down':
                    player.task.player.body.velocity[1] = this.speed
                    break;
                case 'left':
                    player.task.player.body.velocity[0] = -this.speed
                    break;
                case 'right':
                    player.task.player.body.velocity[0] = this.speed
                    break;
            }

            player.task.state.set({ animation })
        }
    }
}
