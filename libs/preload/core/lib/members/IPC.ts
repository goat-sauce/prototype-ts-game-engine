import { ipcRenderer } from 'electron'

export class IPC {
    public async invoke<T>(channel: string): Promise<T> {
        return (await ipcRenderer.invoke(channel)) as T
    }
}
