const path = require('path');
const fs = require('fs');
const CopyPlugin = require("copy-webpack-plugin");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const config = {
    base: {
        stats: 'minimal',
        mode: process.env.mode,
        devtool: 'cheap-source-map',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    loader: 'ts-loader'
                },
            ],
        },
        resolve: {
            extensions: ['.ts'],
            plugins: [new TsconfigPathsPlugin()]
        }
    },
    main: {
        target: 'electron-main',
        entry: './app/main/main.ts',
        output: {
            filename: 'main.bundle.js',
            path: path.resolve(__dirname, '../build')
        }
    },
    assets: {
        entry: {},
        output: {
            path: path.resolve(__dirname, '../build')
        },
        plugins: [
            new CopyPlugin({
                patterns: fs.readdirSync('app/assets').map((dir) => {
                    return {
                        from: `app/assets/${dir}`,
                        to: `assets/${dir}`,
                        filter: (filename) => {
                            if (!filename.includes('.aseprite')) return filename;
                        }
                    }
                })
            }),
        ]
    },
    preload: {
        target: 'electron-preload',
        entry: './app/preload/main.ts',
        output: {
            filename: 'preload.bundle.js',
            path: path.resolve(__dirname, '../build')
        }
    },
    renderer: {
        target: 'electron-renderer',
        entry: './app/renderer/main.ts',
        output: {
            filename: 'renderer.bundle.js',
            path: path.resolve(__dirname, '../build')
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    {
                        from: 'app/renderer/view/renderer.html'
                    },
                    {
                        from: 'app/renderer/view/renderer.css'
                    }
                ]
            }),
        ]
    },
    workers: {
        target: 'node',
        entry: fs.readdirSync('app/workers').reduce((acc, workerFile) => {
            acc[workerFile.replace('.ts', '').toLowerCase()] = path.join(__dirname, `../app/workers/${workerFile}`)
            return acc;
        }, {}),
        output: {
            filename: '[name].worker.bundle.js',
            path: path.resolve(__dirname, '../build')
        }
    },
}

module.exports = [
    { ...config.base, ...config.main },
    { ...config.base, ...config.renderer },
    { ...config.base, ...config.preload },
    { ...config.base, ...config.assets },
    { ...config.base, ...config.workers }
]