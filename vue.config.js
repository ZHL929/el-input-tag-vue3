const { defineConfig } = require('@vue/cli-service')
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = defineConfig({
  // 对所有 node_modules 中的依赖包进行 Babel 转译
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': require('path').resolve(__dirname, 'src') // 配置别名
      }
    },
    // 生产环境
    optimization: {
      minimize: true,
      minimizer: [
        // 压缩js
        new TerserPlugin(),
        // 压缩css
        new CssMinimizerPlugin()
      ],
      // 分割代码
      splitChunks: {
        chunks: 'all',
        cacheGroups: { 
          vendors: {
            name: 'chunk-libs',
            test: /node_modules/,
            chunks: 'all' // only package third parties that are initially dependent
          },
        }
      }
    },
    plugins: [
      // 压缩gzip
      new CompressionPlugin({
        algorithm: 'gzip', // 压缩算法
        test: /\.(js|css)$/, // 匹配文件
        threshold: 10240, // 大于 10KB 的文件才压缩
        minRatio: 0.8, // 压缩比例
      })
    ],
    // 缓存
    cache: {
      type: 'filesystem',
    }
  },
  chainWebpack: config => {
    // 移除 预加载 preload 插件
    config.plugins.delete('preload');
    // 移除 预获取 prefetch 插件
    config.plugins.delete('prefetch');
    // 多线程打包
    config.module
      .rule('js')
      .use('thread-loader')
      .loader('thread-loader')
      .end();
  }

})
