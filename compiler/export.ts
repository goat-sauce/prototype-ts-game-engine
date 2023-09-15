import { base } from './base'
import { main } from './main'
import { renderer } from './renderer'
import { preload } from './preload'
import { assets } from './assets'
import { workers } from './workers'

export default [
    { ...base, ...main },
    { ...base, ...renderer },
    { ...base, ...preload },
    { ...base, ...assets },
    { ...base, ...workers }
]
