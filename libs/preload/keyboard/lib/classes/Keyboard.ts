import { Mapper } from './Mapper'
import { Codes } from './Codes'
import { KeyBinds } from '../enums/KeyBinds'

export class Keyboard {
    public codes: Codes = new Codes()
    public mapper: Mapper = new Mapper()

    public handler = (): void => {
        for (const code of Codes.set.values()) {
            this.mapper.play(code as KeyBinds)
        }
    }
}
