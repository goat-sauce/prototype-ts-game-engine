import { resolve } from 'path'
import { getRoot } from '../utils'
import { base } from './base'

const config = {
    target: 'electron-main',
    entry: './app/main/main.ts',
    output: {
        filename: 'main.bundle.js',
        path: resolve(__dirname, getRoot(process.env.BUILD_DEPTH))
    }
}

export default { ...base, ...config }
