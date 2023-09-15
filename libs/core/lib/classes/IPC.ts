import { ipcRenderer } from 'electron';

export class IPC {
    public async invoke<T>(channel: string): Promise<T | null> {
        return await ipcRenderer.invoke(channel) as T | null
    }
}
