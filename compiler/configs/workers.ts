import { readdirSync } from 'fs'
import { join, resolve } from 'path'
import { getAppRoot, getBuildRoot } from '../utils'
import { base } from './base'

const config = {
    target: 'node',
    entry: readdirSync('app/workers').reduce((acc, workerFile) => {
        acc[workerFile.replace('.ts', '').toLowerCase()] = join(__dirname, `${getAppRoot(process.env.COMPILER_BUILD_DEPTH)}/workers/${workerFile}`)
        return acc
    }, {}),
    output: {
        filename: '[name].worker.bundle.js',
        path: resolve(__dirname, getBuildRoot(process.env.COMPILER_BUILD_DEPTH))
    }
}

export default { ...base, ...config }
