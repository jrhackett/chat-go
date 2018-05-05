const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = {
    DIST: path.resolve(__dirname, 'dist'),
    SRC: path.resolve(__dirname),
}

module.exports = {
    entry: {
        index: path.join(paths.SRC, 'index.jsx')
    },
    devServer: {
        contentBase: paths.SRC,
        proxy: {
            '/api/**':  { target: 'http://localhost:8000', secure: false },
            '/ws/**': { target: 'http://localhost:8000', secure: false }
        }
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    output: {
        path: paths.DIST,
        filename: 'app.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ],
            },
        ],
    },
     plugins: [
        new HtmlWebpackPlugin({
            template: path.join(paths.SRC, 'assets/index.html'),
        }),
    ],
}
