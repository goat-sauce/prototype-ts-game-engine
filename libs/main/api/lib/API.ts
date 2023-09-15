import { SpritesheetsService } from './services/Spritesheets.service'
import { AtlasService } from './services/Atlas.service'
import { AudioService } from './services/Audio.service'
import { GameService } from './services/Game.service'
import { TilemapService } from './services/Tilemap.service'
import { WindowService } from './services/Window.service'
import { ConversationService } from './services/Conversation.service'
import { FontService } from './services/Font.service'

export class API {
    public game: GameService = new GameService()
    public window: WindowService = new WindowService()
    public spritesheets: SpritesheetsService = new SpritesheetsService()
    public atlas: AtlasService = new AtlasService()
    public tilemaps: TilemapService = new TilemapService()
    public audio: AudioService = new AudioService()
    public conversations: ConversationService = new ConversationService()
    public fonts: FontService = new FontService()
}
