import { KeyBinds } from '../enums/KeyBinds'
import { Move } from '../handlers/Move'

export class Keyboard {
    public move: Move = new Move()
    public static codes: Set<KeyBinds> = new Set()

    public add(event: KeyboardEvent) {
        Keyboard.codes.add(event.code as KeyBinds)
    }

    public remove(event: KeyboardEvent) {
        Keyboard.codes.delete(event.code as KeyBinds)
    }

    public handler(codes: Set<KeyBinds>) {
        for (const code of codes.values()) {
            switch (code) {
                case KeyBinds.MoveUp:
                    this.move.up()
                    break
                case KeyBinds.MoveDown:
                    this.move.down()
                    break
                case KeyBinds.MoveLeft:
                    this.move.left()
                    break
                case KeyBinds.MoveRight:
                    this.move.right()
                    break
                default:
                    console.log('end')
            }
        }
    }
}
