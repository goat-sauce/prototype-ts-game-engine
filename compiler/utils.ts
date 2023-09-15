import { readFileSync } from 'fs'
import { options } from './configs/base'

export function getAtlasPath(image: string, absoluteFrom: string) {
    const dirs = absoluteFrom.split('\\')
    const assets = dirs.indexOf('assets')
    const to = dirs.slice(assets, dirs.length - 1).join('/')
    return `${to}/${image}`
}

export function getAnimations(absoluteFrom: string) {
    const filename = absoluteFrom.replace('atlas.json', 'animations.json')
    return readFileSync(filename, 'utf-8')
}

export function getRoot(depth: string) {
    let root = ''

    for (let i = 1; i <= parseInt(depth); i++) {
        root += '../'
    }

    return root + options.dir.build
}