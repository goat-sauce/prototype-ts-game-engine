import { Client } from '@package/core'
import { Keyboard } from '@package/keyboard'

export type Launch = {
    keyboard: Keyboard
    resize: typeof Client.Engine.resize
}
