const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = env => {
  // Use env.<YOUR VARIABLE> here:
  console.log('NODE_ENV: ', env.NODE_ENV)
  console.log('Production: ', env.production)

  return {
    mode: env.NODE_ENV === 'production' ? 'production' : 'development',
    // 入口
    entry: path.resolve(__dirname, 'src/index.ts'),
    // 出口
    output: {
      // 打包后的文件夹
      path: path.resolve(__dirname, 'dist'),
      // 打包后的文件名
      filename: 'bundle.js',
      environment: {
        // 是否允许使用箭头函数
        arrowFunction: false
      }
    },
    // 模块
    module: {
      rules: [
        {
          // 匹配生效文件
          test: /\.ts$/,
          // 使用的loader
          use: [
            {
              // 配置babel
              loader: 'babel-loader',
              options: {
                // 设置预设环境
                presets: [
                  [
                    // 指定环境的插件
                    '@babel/preset-env',
                    // 配置信息
                    {
                      // 要兼容的浏览器版本
                      targets: {
                        ie: '11',
                      },
                      // 指定corejs版本
                      corejs: '3',
                      // 指定corejs的使用方式, usage：按需加载
                      useBuiltIns: 'usage'
                    }
                  ]
                ]
              }
            },
            'ts-loader'
          ],
          // 排除的文件夹
          exclude: /node_modules/
        }
      ]
    },
    // 插件
    plugins: [
      // 处理html的插件
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname, 'index.html')
      }),
      // 每次打包前先清理掉之前的文件
      new CleanWebpackPlugin()
    ],
    // 设置哪些文件可被webpack识别为模块(默认只有js文件)
    resolve: {
      extensions: ['.ts', '.js']
    },
    // 本地开发服务器配置
    devServer: {
      port: 9960,
      open: true
    }
  }
}