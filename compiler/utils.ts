import { options } from './configs/base'

export function getAppRoot(): string {
    let root = ''

    for (let i = 1; i <= parseInt(getDepth()); i++) {
        root += '../'
    }

    return root + options.dir.app
}

export function getBuildRoot(): string {
    let root = ''

    for (let i = 1; i <= parseInt(getDepth()); i++) {
        root += '../'
    }

    return root + options.dir.build
}

export function getDepth(): string {
    return process.env.COMPILER_BUILD_DEPTH ? process.env.COMPILER_BUILD_DEPTH : '2'
}
