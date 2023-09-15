import { Client } from '@package/core'

export namespace Move {
    export const Speed = 1

    export const up = (client: Client.Engine) => {
        Client.Engine.stage.position.y += Speed * Client.Engine.ticker.deltaMS
    }

    export const down = (client: Client.Engine) => {
        Client.Engine.stage.position.y -= Speed * Client.Engine.ticker.deltaMS
    }

    export const left = (client: Client.Engine) => {
        Client.Engine.stage.position.x += Speed * Client.Engine.ticker.deltaMS
    }

    export const right = (client: Client.Engine) => {
        Client.Engine.stage.position.x -= Speed * Client.Engine.ticker.deltaMS
    }
}
