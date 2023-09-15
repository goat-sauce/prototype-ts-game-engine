import { options } from './configs/base'

export function getAppRoot(): string {
    let root = ''

    for (let i = 1; i <= parseInt(getCompilerDepth()); i++) {
        root += '../'
    }

    return root + options.dir.app
}

export function getBuildRoot(): string {
    let root = ''

    for (let i = 1; i <= parseInt(getCompilerDepth()); i++) {
        root += '../'
    }

    return root + options.dir.build
}

export function getCompilerDepth(): string {
    return '2'
}
