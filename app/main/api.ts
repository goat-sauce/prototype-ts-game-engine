import { Assets } from "./crud/Assets";
import { Chunks } from "./crud/Chunks";
import { Game } from "./crud/Game";
import { Window } from "./crud/Window";

export const api: API = {
    game: new Game(),
    window: new Window(),
    assets: new Assets(),
    chunks: new Chunks()
};