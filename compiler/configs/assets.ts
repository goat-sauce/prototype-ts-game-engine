import CopyPlugin from 'copy-webpack-plugin'
import { resolve } from 'path'
import { dirSearch, getAnimations, getAtlasPath, getBuildRoot } from '../utils'
import { base } from './base'
import { Pattern } from './types'

const helper = {
    spritesheets: {
        transform: (content: Buffer, absoluteFrom: string) => {
            const dirs = absoluteFrom.split('\\')
            const file = dirs[dirs.length - 1]

            switch (file) {
                case 'atlas.json':
                    const animations = getAnimations(absoluteFrom)
                    const atlas = JSON.parse(content.toString())
                    atlas.meta.image = getAtlasPath(atlas.meta.image, absoluteFrom)
                    if (animations) atlas.animations = JSON.parse(animations)
                    return JSON.stringify(atlas, null, 4)
            }

            return content
        },
        filter: (filename: string): true => {
            const dirs = filename.split('/')
            const file = dirs[dirs.length - 1]

            if (file === 'atlas.json' || file.includes('.png')) {
                return true
            }

        }
    }
}

const spritesheets: Pattern[] = dirSearch('app/assets/spritesheets', []).map(() => {
    return {
        from: `app/assets/spritesheets`,
        to: 'assets/spritesheets',
        filter: helper.spritesheets.filter,
        transform: helper.spritesheets.transform
    }
})

const fonts: Pattern[] = [{
    from: `app/assets/fonts`,
    to: 'assets/fonts'
}]

const config = {
    entry: {},
    output: {
        path: resolve(__dirname, getBuildRoot(process.env.COMPILER_BUILD_DEPTH))
    },
    plugins: [
        new CopyPlugin({
            patterns: [...fonts, ...spritesheets]
        })
    ]
}

export default { ...base, ...config }
