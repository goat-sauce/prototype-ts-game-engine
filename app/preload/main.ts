import * as Core from '@package/core';
import * as Jobs from '@package/jobs';
import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('client', {
    launch: () => {
        const client = new Core.Client();
        client.setup();
        client.delegate([new Jobs.Start()]);
        client.ticker.add(() => client.state())
        client.ticker.start();
    },
    addEnemies: (number: number) => {
        console.log(number, 'hello')
    }
})