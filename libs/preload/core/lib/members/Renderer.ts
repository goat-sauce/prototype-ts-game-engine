import { Renderer as RendererPIXI } from 'pixi.js'
import { Size } from 'preload/core/types'

export class Renderer extends RendererPIXI {
    public size(): Size {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }
}
