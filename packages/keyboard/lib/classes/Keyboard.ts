import { Client } from '@package/core'
import { KeyBinds } from '../enums/KeyBinds'
import { Move } from '../handlers/move'

export class Keyboard {
    public static codes: Set<KeyBinds> = new Set()

    public add(event: KeyboardEvent) {
        Keyboard.codes.add(event.code as KeyBinds)
    }

    public remove(event: KeyboardEvent) {
        Keyboard.codes.delete(event.code as KeyBinds)
    }

    public handler(client: Client, codes: Set<KeyBinds>) {
        for (const code of codes.values()) {
            switch (code) {
                case KeyBinds.MoveUp:
                    Move.up(client)
                    break
                case KeyBinds.MoveDown:
                    Move.down(client)
                    break
                case KeyBinds.MoveLeft:
                    Move.left(client)
                    break
                case KeyBinds.MoveRight:
                    Move.right(client)
                    break
            }
        }
    }
}
