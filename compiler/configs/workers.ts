import { readdirSync } from 'fs'
import { join, resolve } from 'path'
import { getRoot } from '../utils'
import { base } from './base'

const config = {
    target: 'node',
    entry: readdirSync('app/workers').reduce((acc, workerFile) => {
        acc[workerFile.replace('.ts', '').toLowerCase()] = join(__dirname, `../app/workers/${workerFile}`)
        return acc
    }, {}),
    output: {
        filename: '[name].worker.bundle.js',
        path: resolve(__dirname, getRoot(process.env.BUILD_DEPTH))
    }
}

export default { ...base, ...config }
