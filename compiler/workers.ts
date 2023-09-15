import { readdirSync } from 'fs'
import { join, resolve } from 'path'

export const workers = {
    target: 'node',
    entry: readdirSync('app/workers').reduce((acc, workerFile) => {
        acc[workerFile.replace('.ts', '').toLowerCase()] = join(__dirname, `../app/workers/${workerFile}`)
        return acc
    }, {}),
    output: {
        filename: '[name].worker.bundle.js',
        path: resolve(__dirname, '../build')
    }
}
