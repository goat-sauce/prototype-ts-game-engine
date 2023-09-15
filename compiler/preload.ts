import { resolve } from 'path'

export const preload = {
  target: 'electron-preload',
  entry: './app/preload/main.ts',
  output: {
    filename: 'preload.bundle.js',
    path: resolve(__dirname, '../build'),
  },
}
