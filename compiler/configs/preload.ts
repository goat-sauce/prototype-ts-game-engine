import { resolve } from 'path'
import { getBuildRoot } from '../utils'
import { base } from './base'

const config = {
    target: 'electron-preload',
    entry: './app/preload/main.ts',
    output: {
        filename: 'preload.bundle.js',
        path: resolve(__dirname, getBuildRoot(process.env.COMPILER_BUILD_DEPTH))
    }
}

export default { ...base, ...config }
