const path = require("path")

const { PurgeIcons } = require('purge-icons-webpack-plugin')

// webpack.config.js
module.exports = {
    // ...options
    plugins: [
        new PurgeIcons({
            /* PurgeIcons Options */
        })
    ]
}

module.exports = ({config}) => {
    config.resolve.modules = [
        path.resolve(__dirname, "..", "src"),
        "node_modules",
    ]

    config.resolve.alias = {
        "@": path.resolve(__dirname, "..", "src"),
        "vue": "vue/dist/vue.esm-bundler"
    }

    // styles
    config.module.rules.push({
        test: /\.(sass|scss|css)$/,
        use: ['resolve-url-loader'],     include: path.resolve(__dirname, '../')
    });

    // fonts
    config.module.rules.push({
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [
            {
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]'
                }
            }
        ],
        include: path.resolve(__dirname, '../')
    });

    config.module.rules.push({
        test: /\.ts$/,
        loader: require.resolve('@open-wc/webpack-import-meta-loader'),
    })

    return config
}
