import { AssetService } from './services/Asset.service'
import { AtlasService } from './services/Atlas.service'
import { ChunkService } from './services/Chunk.service'
import { GameService } from './services/Game.service'
import { WindowService } from './services/Window.service'

export class API {
    public game: GameService = new GameService()
    public window: WindowService = new WindowService()
    public assets: AssetService = new AssetService()
    public chunk: ChunkService = new ChunkService()
    public atlas: AtlasService = new AtlasService()
}
