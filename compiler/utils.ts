import { existsSync, lstatSync, readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import { options } from './configs/base'

export function getAtlasPath(image: string, absoluteFrom: string) {
    const dirs = absoluteFrom.split('\\')
    const assets = dirs.indexOf('assets')
    const to = dirs.slice(assets, dirs.length - 1).join('/')
    return `${to}/${image}`
}

export function getAnimations(absoluteFrom: string) {
    const filename = absoluteFrom.replace('atlas.json', 'animations.json')
    const exists = existsSync(filename)
    return exists ? readFileSync(filename, 'utf-8') : null
}

export function getAppRoot(depth: string) {
    let root = ''

    for (let i = 1; i <= parseInt(depth); i++) {
        root += '../'
    }

    return root + options.dir.app
}

export function getBuildRoot(depth: string) {
    let root = ''

    for (let i = 1; i <= parseInt(depth); i++) {
        root += '../'
    }

    return root + options.dir.build
}

export function dirSearch(root: string, array: string[], search?: string) {
    try {
        const dir = readdirSync(root)

        for (const file of dir) {
            const path = join(root, file)
            const stat = lstatSync(path)

            if (stat.isDirectory()) {
                dirSearch(path, array, search)
                continue
            }

            if ((search && path.includes(search)) || !search) {
                array.push(path)
            }
        }

        return array
    } catch (error) {
        console.error(error)
    }
}
