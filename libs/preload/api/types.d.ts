import { Engine } from '@preload/core'
import { Keyboard } from '@preload/keyboard'

export type Launch = {
    keyboard: Keyboard
    resize: typeof Engine.resize
}

export type Crash = {
    message: string
    error: unknown
}
