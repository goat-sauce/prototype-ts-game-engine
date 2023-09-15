import { resolve } from 'path'
import { getBuildRoot } from '../utils'
import { base } from './base'

const config = {
    target: 'electron-preload',
    entry: './app/preload/main.ts',
    output: {
        filename: 'preload.bundle.js',
        path: resolve(__dirname, getBuildRoot())
    }
}

export default { ...base, ...config }
