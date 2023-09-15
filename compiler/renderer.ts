import CopyPlugin from 'copy-webpack-plugin'
import { resolve } from 'path'

export const renderer = {
    target: 'electron-renderer',
    entry: './app/renderer/main.ts',
    output: {
        filename: 'renderer.bundle.js',
        path: resolve(__dirname, '../build')
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
