import CopyPlugin from 'copy-webpack-plugin'
import { resolve } from 'path'
import { getBuildRoot } from '../utils'
import { base } from './base'

const config = {
    target: 'electron-renderer',
    entry: './app/renderer/main.ts',
    output: {
        filename: 'renderer.bundle.js',
        path: resolve(__dirname, getBuildRoot())
    },
    plugins: [
        new CopyPlugin({
            patterns: ['css', 'html'].map((ext: string) => {
                return {
                    from: `app/renderer/view/renderer.${ext}`
                }
            })
        })
    ]
}

export default { ...base, ...config }
