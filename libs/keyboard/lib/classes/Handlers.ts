import { Debug } from '../handlers/Debug';
import { Play } from '../handlers/Play';

export class Handlers {
    public play = new Play()
    public debug = new Debug()
}
