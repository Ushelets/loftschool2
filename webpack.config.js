const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATH = {
    source: path.join(__dirname, 'source'),
    build:path.join(__dirname, 'build')
};

const common = {
    entry: {
        'index': PATH.source + '/pages/index/index.js',
        'blog': PATH.source + '/pages/blog/blog.js'
    },
    output: {
        path: PATH.build,
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ['index'],
            template: PATH.source + '/pages/index/index.pug'
        }),
        new HtmlWebpackPlugin({
            filename: 'blog.html',
            chunks: ['blog'],
            template: PATH.source + '/pages/blog/blog.pug'
        })
    ],
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            }
        ]
    },

};

const developmentConfig = {
    devServer: {
        stats: 'errors-only',
        port: 9000
    }
};

module.exports = function (env) {
    if (env === 'production') {
        return common;
    }
    if (env === 'development') {
        return Object.assign(
            {},
            common,
            developmentConfig
        )
    }
};