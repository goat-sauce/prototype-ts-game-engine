import { Client } from '@package/core'
import { Player } from '@package/tasks'
import { PlayerState } from 'tasks/types'

export class Move {
    public speed = 35
    public up(): void { this.handle('up') }
    public down(): void { this.handle('down') }
    public left(): void { this.handle('left') }
    public right(): void { this.handle('right') }

    public handle(animation: string): void {
        const player = Client.Engine.registry.search<Player, PlayerState>('player')

        if (player && player.render) {
            switch (animation) {
                case 'up':
                    player.task.actor.physics.body.velocity[1] = -this.speed
                    break;
                case 'down':
                    player.task.actor.physics.body.velocity[1] = this.speed
                    break;
                case 'left':
                    player.task.actor.physics.body.velocity[0] = -this.speed
                    break;
                case 'right':
                    player.task.actor.physics.body.velocity[0] = this.speed
                    break;
            }

            player.task.state.set({ animation })
        }
    }
}
