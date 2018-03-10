
// webpack 配置文件，这里是js模块

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: __dirname + "/source/index.js",  // 入口文件
    output: {                               // 输出文件
        path: __dirname + "/build",         // 输出文件夹
        filename: "main-[hash].js"          // 输出文件名，hash参数每次打包会生成不一样的串
    },

    // Loaders webpack处理不同的文件，可以设置调用不同的脚本或者工具去处理
    module: {

        // 文件处理规则，规则数组
        rules: [
            {
                test: /(\.jsx|\.js)$/,      // 要处理的文件
                use: {                      // 调用的脚本或者工具    
                    loader: "babel-loader", // 脚本或工具
                },
                exclude: /node_modules/,    // 额外包含
            },
            {
                test: /\.css$/,
                // 使用css分离插件
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader?modules", "postcss-loader"]
                  })
            }
        ]
    },
    
    plugins: [
        // 清除文件的插件，第一个参数为要清楚的文件，第二参数是选项
        new CleanWebpackPlugin(["build/*.css", "build/*.js"], {
            exclude: ["index.html"],    // 不清除的文件
            verbose: true,              // 打印日日志到控制台
            dry: false,                 // 是否测试，true假删除，false真删除
        }),
        new webpack.BannerPlugin('版权所有，翻版必究'),    // 指定banner信息
        new HtmlWebpackPlugin({
            template: __dirname + "/source/index.html"  // 指定html模版文件
        }),
        new webpack.optimize.UglifyJsPlugin(),          // 压缩代码插件开发阶段不建议打开，发布建议打开
        new webpack.optimize.OccurrenceOrderPlugin(),   // 自动分配ID插件
        new ExtractTextPlugin("main-[hash].css"),     // 分离css和js文件的插件
    ],
};