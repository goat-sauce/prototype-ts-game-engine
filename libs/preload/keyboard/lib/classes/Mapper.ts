import { KeyBinds, KeyBindsDebug } from '../enums/KeyBinds'
import { Handlers } from './Handlers'

export class Mapper {
    public handlers = new Handlers()

    public play(code: KeyBinds): void {
        switch (code) {
            case KeyBinds.EditMode:
                // this.handlers.play.editMode()
                break
            case KeyBinds.MoveUp:
                this.handlers.play.move.up()
                break
            case KeyBinds.MoveDown:
                this.handlers.play.move.down()
                break
            case KeyBinds.MoveLeft:
                this.handlers.play.move.left()
                break
            case KeyBinds.MoveRight:
                this.handlers.play.move.right()
                break
        }
    }

    public debug(code: KeyBindsDebug): void {
        switch (code) {
            case KeyBindsDebug.NextTile:
                this.handlers.debug.nextTile()
                break
            case KeyBindsDebug.PrevTile:
                this.handlers.debug.prevTile()
                break
        }
    }
}
