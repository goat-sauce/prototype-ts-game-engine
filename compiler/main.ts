import { resolve } from 'path'

export const main = {
    target: 'electron-main',
    entry: './app/main/main.ts',
    output: {
        filename: 'main.bundle.js',
        path: resolve(__dirname, '../build')
    }
}
