import CopyPlugin from 'copy-webpack-plugin'
import { readdirSync } from 'fs'
import { resolve } from 'path'

export const assets = {
    entry: {},
    output: {
        path: resolve(__dirname, '../build')
    },
    plugins: [
        new CopyPlugin({
            patterns: readdirSync('app/assets').map((dir) => {
                return {
                    from: `app/assets/${dir}`,
                    to: `assets/${dir}`,
                    filter: (filename) => {
                        if (!filename.includes('.aseprite') || !filename.includes('animation.json')) return true
                    },
                    transform: (content, absoluteFrom) => {
                        if (absoluteFrom.includes('atlas.json')) {
                            console.log(content.toString())
                            const json = JSON.parse(content.toString())
                            console.log(json)
                            console.log(json.meta.image)
                        }
                        return content
                    }
                }
            })
        })
    ]
}
