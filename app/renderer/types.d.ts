import { Client } from "@package/core"
import { Keyboard } from "@package/keyboard"

export { }

declare global {
    export interface Window {
        client: {
            launch: () => Promise<{ keyboard: Keyboard, resize: typeof Client.Engine.resize }>
        }
    }
}