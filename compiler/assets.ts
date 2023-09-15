import CopyPlugin from 'copy-webpack-plugin'
import { readdirSync, readFileSync } from 'fs'
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
                        if (!filename.includes('.aseprite') || !filename.includes('animations.json')) return true
                    },
                    transform: (content, absoluteFrom) => {
                        const dirs = absoluteFrom.split('\\')
                        const file = dirs[dirs.length - 1]

                        switch (file) {
                            case 'atlas.json':
                                const animations = getAnimations(absoluteFrom)
                                const atlas = JSON.parse(content.toString())
                                atlas.meta.image = getAtlasPath(atlas.meta.image, absoluteFrom)
                                atlas.animations = JSON.parse(animations)
                                return JSON.stringify(atlas, null, 4)
                        }

                        return content
                    }
                }
            })
        })
    ]
}

function getAtlasPath(image: string, absoluteFrom: string) {
    const dirs = absoluteFrom.split('\\')
    const assets = dirs.indexOf('assets')
    const to = dirs.slice(assets, dirs.length - 1).join('/')
    return `${to}/${image}`
}

function getAnimations(absoluteFrom: string) {
    const animationsFilename = absoluteFrom.replace('atlas.json', 'animations.json')
    return readFileSync(animationsFilename, 'utf-8')
}
