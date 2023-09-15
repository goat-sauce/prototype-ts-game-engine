import { resolve } from 'path'
import { getBuildRoot } from '../utils'
import { base } from './base'

const config = {
    target: 'electron-main',
    entry: './app/main/main.ts',
    output: {
        filename: 'main.bundle.js',
        path: resolve(__dirname, getBuildRoot())
    }
}

export default { ...base, ...config }
