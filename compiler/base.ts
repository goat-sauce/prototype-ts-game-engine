import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'

export const base = {
    stats: 'minimal',
    mode: process.env.mode,
    devtool: 'cheap-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.ts'],
        plugins: [new TsconfigPathsPlugin()]
    }
}
