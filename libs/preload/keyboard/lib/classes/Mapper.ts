import { KeyBinds } from '../enums/KeyBinds'
import { Handlers } from './Handlers'

export class Mapper {
    public handlers = new Handlers()

    public play(code: KeyBinds): void {
        switch (code) {
            case KeyBinds.MoveUp:
                this.handlers.play.move.up()
                break
            case KeyBinds.MoveDown:
                this.handlers.play.move.down()
                break
            case KeyBinds.Interact:
                this.handlers.play.interact()
                break
            case KeyBinds.MoveLeft:
                this.handlers.play.move.left()
                break
            case KeyBinds.MoveRight:
                this.handlers.play.move.right()
                break
        }
    }
}
