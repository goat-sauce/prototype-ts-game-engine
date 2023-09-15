import * as Core from '@package/core';

export namespace Move {
    export const Speed = 1;

    export const up = (client: Core.Client) => {
        console.log('up!!')
        client.stage.position.y += Speed * client.ticker.deltaMS;
    }

    export const down = (client: Core.Client) => {
        client.stage.position.y -= Speed * client.ticker.deltaMS;
    }

    export const left = (client: Core.Client) => {
        client.stage.position.x += Speed * client.ticker.deltaMS;
    }

    export const right = (client: Core.Client) => {
        client.stage.position.x -= Speed * client.ticker.deltaMS;
    }
}