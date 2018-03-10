module.exports = {
    entry: "./source/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/build"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/, 
                loader: "awesome-typescript-loader"
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {                
                test: /\.js$/,                 
                loader: "source-map-loader",
                enforce: "pre"
            }
        ]
    },

    // devServer 配置了webpack-dev-server的配置
    devServer: {
        contentBase: "./build",     // 内容文件夹
        historyApiFallback: true,   // h5 history的新API，不让页面跳转
        inline: true,               // 实时刷新
        port: 8080,                 // 端口，默认8080
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};