import { Engine } from '@preload/core'
import { Player } from '@preload/game'
import { PlayerState } from 'preload/game/types'
import { Codes } from '../classes/Codes'

export class Move {
    public speed = 30
    public up(): void { this.handle('up') }
    public down(): void { this.handle('down') }
    public left(): void { this.handle('left') }
    public right(): void { this.handle('right') }

    public handle(animation: string): void {
        const player = Engine.registry.search<Player, PlayerState>('player')

        if (player) {
            switch (animation) {
                case 'up':
                    player.actor.physics.body.velocity[1] = -this.speed / Codes.set.size
                    break
                case 'down':
                    player.actor.physics.body.velocity[1] = this.speed / Codes.set.size
                    break
                case 'left':
                    player.actor.physics.body.velocity[0] = -this.speed / Codes.set.size
                    break
                case 'right':
                    player.actor.physics.body.velocity[0] = this.speed / Codes.set.size
                    break
            }

            player.state.set({ animation })
        }
    }
}
