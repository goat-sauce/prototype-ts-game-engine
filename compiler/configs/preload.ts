import { resolve } from 'path'
import { getRoot } from '../utils'
import { base } from './base'

const config = {
    target: 'electron-preload',
    entry: './app/preload/main.ts',
    output: {
        filename: 'preload.bundle.js',
        path: resolve(__dirname, getRoot(process.env.BUILD_DEPTH))
    }
}

export default { ...base, ...config }
