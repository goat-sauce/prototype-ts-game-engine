const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

const config = {
    base: {
        mode: process.env.mode,
        devtool: 'cheap-source-map',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.ts'],
        }
    },
    main: {
        entry: './app/main.ts',
        target: 'electron-main',
        output: {
            filename: 'main.bundle.js',
            path: path.resolve(__dirname, 'build')
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    {
                        from: "app/assets/**/*",
                        to: "[name][ext]"
                    }
                ],
            }),
        ]
    },
    preload: {
        entry: './app/preload.ts',
        target: 'electron-preload',
        output: {
            filename: 'preload.bundle.js',
            path: path.resolve(__dirname, 'build')
        }
    },
    renderer: {
        entry: './app/renderer.ts',
        target: 'electron-renderer',
        output: {
            filename: 'renderer.bundle.js',
            path: path.resolve(__dirname, 'build')
        }
    }
}

module.exports = [
    { ...config.base, ...config.main },
    { ...config.base, ...config.renderer },
    { ...config.base, ...config.preload }
]