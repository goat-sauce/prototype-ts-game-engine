import { Engine } from '@preload/core'
import { Player } from '@preload/tasks'
import { PlayerState } from 'preload/tasks/types'
import { Codes } from '../classes/Codes'

export class Move {
    public speed = 30
    public up(): void {
        this.handle('up')
    }
    public down(): void {
        this.handle('down')
    }
    public left(): void {
        this.handle('left')
    }
    public right(): void {
        this.handle('right')
    }

    public handle(animation: string): void {
        const player = Engine.registry.search<Player, PlayerState>('player')

        if (player && player.render) {
            switch (animation) {
                case 'up':
                    player.task.actor.physics.body.velocity[1] = -this.speed / Codes.set.size
                    break
                case 'down':
                    player.task.actor.physics.body.velocity[1] = this.speed / Codes.set.size
                    break
                case 'left':
                    player.task.actor.physics.body.velocity[0] = -this.speed / Codes.set.size
                    break
                case 'right':
                    player.task.actor.physics.body.velocity[0] = this.speed / Codes.set.size
                    break
            }

            player.task.state.set({ animation })
        }
    }
}
