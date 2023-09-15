export type Pattern = {
    from: string
    to: string
    filter?: (filename: string) => true
    transform?: (content: Buffer, absoluteFrom: string) => string | Buffer
}
