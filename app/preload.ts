import { contextBridge } from 'electron';
import { InputSet, Game } from './classes/Game';
import { Jobs } from './jobs';

const game = new Game();

contextBridge.exposeInMainWorld('render', {
    start: () => {
        game.init();
        game.employ([new Jobs.Floor(), new Jobs.Dummy()]);

        game.ticker.add(() => {
            game.input.handler(game, InputSet.codes);
            game.renderer.render(game.container);
        })

        game.ticker.start();

        window.addEventListener('resize', game.resize.bind(game))
        document.addEventListener('keydown', InputSet.add)
        document.addEventListener('keyup', InputSet.remove)
    },
    stop: () => {
        game.ticker.stop();
    }
})