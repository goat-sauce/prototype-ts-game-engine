import { Client } from '@package/core'
import { Mapper } from './Mapper'
import { Codes } from './Codes'
import { KeyBinds, KeyBindsDebug } from '../enums/KeyBinds'

export class Keyboard {
    public codes: Codes = new Codes()
    public mapper: Mapper = new Mapper()

    public handler = (): void => {
        for (const code of Codes.set.values())
            switch (Client.mode.current) {
                case Client.Mode.Play:
                    this.mapper.play(code as KeyBinds)
                    break
                case Client.Mode.Debug:
                    this.mapper.debug(code as KeyBindsDebug)
                    break
            }
    }
}
