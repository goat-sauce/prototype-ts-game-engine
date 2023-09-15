import { Client } from '@package/core'

export namespace Move {
  export const Speed = 1

  export const up = (client: Client) => {
    Client.stage.position.y += Speed * Client.ticker.deltaMS
  }

  export const down = (client: Client) => {
    Client.stage.position.y -= Speed * Client.ticker.deltaMS
  }

  export const left = (client: Client) => {
    Client.stage.position.x += Speed * Client.ticker.deltaMS
  }

  export const right = (client: Client) => {
    Client.stage.position.x -= Speed * Client.ticker.deltaMS
  }
}
