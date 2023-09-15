import { Keyboard } from '@package/keyboard'
import { Container, Renderer, Ticker } from 'pixi.js'
import { Runner } from './classes/Runner'
import { Pool } from './classes/Pool'
import { Stage } from 'core/types'
import { Assets } from './classes/AssetLoader'
import { Memory } from '@package/memory'
import { Task } from '@package/tasks'
import { Chunk } from '../../../app/main/classes/Chunk'

export namespace Client {
    export enum Mode {
        Play = 'play',
        Placement = 'placement',
        Overlay = 'overlay'
    }

    export class Engine {
        public static renderer: Renderer = new Renderer(Engine.size())
        public static ticker: Ticker = new Ticker()
        public static stage: Stage = new Container()
        public static runner: Runner = new Runner()
        public static keyboard: Keyboard = new Keyboard()
        public static pool: Pool = new Pool()
        public static assets: Assets = new Assets()
        public static state: Memory = new Memory()
        public static mode: Mode = Mode.Play
        public static view: HTMLCanvasElement = Engine.renderer.view as unknown as HTMLCanvasElement

        public static size() {
            return {
                width: window.innerWidth,
                height: window.innerHeight
            }
        }

        public static async setup() {
            Engine.load()
            Engine.eventListeners()
            Engine.start()
        }

        public static start() {
            document.body.append(Engine.view)
        }

        public static load() {
            Engine.assets.load()
            Engine.state.set<Task[]>('tasks', [])
            Engine.state.set<Chunk[]>('chunks', [])
            Engine.state.set<number>('timer', Engine.ticker.deltaMS)
            Engine.state.set<number>('frame', 0)
        }

        private static eventListeners() {
            document.addEventListener('keydown', Engine.keyboard.add)
            document.addEventListener('keyup', Engine.keyboard.remove)
            window.addEventListener('resize', Engine.resize)
        }

        public static resize() {
            const size = Engine.size()
            Engine.view.height = size.height
            Engine.view.width = size.width
            Engine.renderer.resize(size.width, size.height)
        }

        public static fps() {
            const timer = Engine.state.get<number>('timer')
            const frame = Engine.state.get<number>('frame')
            Engine.state.set('timer', timer + Engine.ticker.deltaMS)
            Engine.state.set('frame', frame + 1)
            return Math.floor(frame / new Date(timer).getSeconds())
        }

        public static update() {
            const tasks = Engine.state.get<Task[]>('tasks')
            const chunks = Engine.state.get<Chunk[]>('chunks')
            Engine.state.set<Task[]>('tasks', [])
            Engine.state.set<Chunk[]>('chunks', [])
            Engine.renderer.render(Engine.stage)
            Engine.keyboard.handler(this, Keyboard.codes)
            if (tasks.length > 0) Engine.runner.work(tasks)
            if (chunks.length > 0) Engine.runner.load(chunks)
        }
    }
}
