import { options } from './configs/base'

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