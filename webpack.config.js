const path = require("path");
module.exports = {
    mode: 'production' || 'development',
    entry: {
        index: "./src/index.ts"
    },
    output: {
        publicPath: __dirname + "/dist/", // 打包后资源文件的引用会基于此路径
        path: path.resolve(__dirname, "dist"), // 打包后的输出目录
        filename: "app.bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    devtool: 'eval-source-map'
}
