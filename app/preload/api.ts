import { contextBridge } from 'electron'
import { GameService } from './services/Game.service'

export class API {
    public game: GameService = new GameService()

    public static expose(api: API): void {
        contextBridge.exposeInMainWorld('api', api)
    }
}
