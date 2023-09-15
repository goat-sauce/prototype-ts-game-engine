import { parentPort } from "node:worker_threads";
import * as Utils from '@package/utils';

parentPort.on('message', async message => {
    console.log(message);
    await Utils.wait(5000);
    parentPort.postMessage({ test: true });
})