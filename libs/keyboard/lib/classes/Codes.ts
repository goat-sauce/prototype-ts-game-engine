import { KeyBinds, KeyBindsDebug } from '../enums/KeyBinds'

export class Codes {
    public static set: Set<KeyBinds | KeyBindsDebug> = new Set()

    public add = (code: string): void => {
        Codes.set.add(code as KeyBinds)
    }

    public remove = (code: string): void => {
        Codes.set.delete(code as KeyBinds)
    }
}
