import CopyPlugin from 'copy-webpack-plugin'
import { resolve } from 'path'
import { getBuildRoot } from '../utils'
import { base } from './base'

const config = {
    target: 'electron-renderer',
    entry: './app/renderer/main.ts',
    output: {
        filename: 'renderer.bundle.js',
        path: resolve(__dirname, getBuildRoot(process.env.COMPILER_BUILD_DEPTH))
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: 'app/renderer/view/renderer.html'
                },
                {
                    from: 'app/renderer/view/renderer.css'
                }
            ]
        })
    ]
}

export default { ...base, ...config }
