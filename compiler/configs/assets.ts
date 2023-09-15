import CopyPlugin from 'copy-webpack-plugin'
import { lstatSync, readdirSync } from 'fs'
import { join, resolve } from 'path'
import { getAnimations, getAtlasPath, getRoot } from '../utils'
import { base } from './base'

function dirSearch(root: string, search: string, array: string[]) {
    try {
        const dir = readdirSync(root)

        for (const file of dir) {
            const path = join(root, file)
            const stat = lstatSync(path)

            if (stat.isDirectory()) {
                dirSearch(path, search, array)
            } else {
                array.push(path)
            }
        }

        return array
    } catch (error) {
        console.error(error)
    }
}

type Pattern = {
    from: string;
    to: string;
    filter?: (filename: string) => true;
    transform?: (content: Buffer, absoluteFrom: string) => string | Buffer;
}

const patterns: Pattern[] = dirSearch('app/assets/spritesheets', 'atlas.json', []).map((path: string) => {
    return {
        from: `app/assets/spritesheets`,
        to: 'assets/spritesheets',
        filter: (filename: string) => {
            const dirs = filename.split('/')
            const file = dirs[dirs.length - 1]

            if (file === 'atlas.json' || file.includes('.png')) {
                return true
            }
        },
        transform: (content: Buffer, absoluteFrom: string) => {
            const dirs = absoluteFrom.split('\\')
            const file = dirs[dirs.length - 1]

            switch (file) {
                case 'atlas.json':
                    const animations = getAnimations(absoluteFrom)
                    const atlas = JSON.parse(content.toString())
                    atlas.meta.image = getAtlasPath(atlas.meta.image, absoluteFrom)
                    atlas.animations = JSON.parse(animations);
                    return JSON.stringify(atlas, null, 4)
            }

            return content
        }
    }
})

patterns.push({
    from: `app/assets/fonts`,
    to: 'assets/fonts',
})

const config = {
    entry: {},
    output: {
        path: resolve(__dirname, getRoot(process.env.BUILD_DEPTH))
    },
    plugins: [
        new CopyPlugin({
            patterns
        })
    ]
}

export default { ...base, ...config }
