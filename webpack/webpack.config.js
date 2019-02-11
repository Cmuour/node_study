const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    /*
        entry 有三种写法
        1、 一个字符串
        2、 一个数组
        3、 一个对象，多入口
        先找到每个入口（Entry），然后从各个入口分别出发，找到依赖的模块（Module）
        然后生成一个Chunk（代码块），最后会把Chunk写到文件系统中（Assets）
    */
    entry:'image.js',   //  入口
    output:{    //  出口
        path:path.join(__dirname,'dist'),
        filename:'[name].[hash:8].js'
    },
    module:{    
        rules:[
            {
                test: /\.css$/, //转换css文件的匹配规则
                // css-loader 用来解析处理css文件中的url路径
                // style-loader 可以把css文件变成style标签插入head中
                loader: ["style-loader","css-loader"]
            },
            {
                test: /\.(png|jpg|jpeg|svg|bmp|gif)/,
                use: 'file-loader'
            }
        ]
    },
    plugins:[
        // 用来自动向模块内部注入变量
        // new webpack.ProvidePlugin({
        //     $:'jquery'
        // }),

        // 每次打包编译删除dist目录，重新生成最新的
        new CleanWebpackPlugin([path.join(__dirname,'dist')]),

        // 此插件可以自动产出html
        // new HtmlWebpackPlugin({
        //     template: './src/base.html', // 指定产的html模板
        //     filename: 'base.html', // 产出的html文件名
        //     title: 'base',
        //     chunks:['base'], // 在产出的html文件里引入哪些代码块
        //     hash: true, // 会在引入的js里加入查询字符串避免缓存
        //     minify: {
        //         removeAttributeQuotes: true
        //     }
        // }),

        new HtmlWebpackPlugin({
            template: './src/index.html', // 指定产的html模板
            filename: 'index.html', // 产出的html文件名
            title: 'mour',
            chunks:['index'],
            hash: true, // 会在引入的js里加入查询字符串避免缓存
            minify: {
                removeAttributeQuotes: true
            }
        })
    ],
    // 配置此静态文件服务器，可以用来预览打包后的项目
    devServer:{
        contentBase: './dist',
        host: 'localhost',
        port: 8080,
        compress: true // 服务器返回给浏览器的时候是否启动gzip压缩
    }
}