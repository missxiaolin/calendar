module.exports = {
  publicPath: "/",
  // 输出目录
  outputDir: "dist",

  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // 是否使用包含运行时编译器的Vue核心的构建
  // runtimeCompiler: false,
  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,

  // 高级的方式
  // configureWebpack: config => {
  //   // config.externals = {
  //   //     'vue': 'Vue',
  //   //     'vue-router': 'VueRouter',
  //   //     'moment': 'moment'
  //   // }
  //   // config.externals = process.env.NODE_ENV == 'development' ? {} : {
  //   //     'vue': 'Vue',
  //   //     'vue-router': 'VueRouter',
  //   //     'moment': 'moment'
  //   // }
  // },

  // CSS 相关选项
  // css: {
  //   //extract: true,
  //   // 是否开启 CSS source map？
  //   sourceMap: false,
  //   // 为预处理器的 loader 传递自定义选项。比如传递给
  //   // sass-loader 时，使用 `{ sass: { ... } }`。
  //   loaderOptions: {}, // 为所有的 CSS 及其预处理文件开启 CSS Modules。

  //   // modules: false
  // },
  // 在多核机器下会默认开启。
  parallel: require("os").cpus().length > 1,
  // PWA 插件的选项。
  pwa: {},
  // 配置 webpack-dev-server 行为。
  devServer: {
    // open: process.env.NODE_ENV === "development" ,
    host: "", // 不设置默认 Local 为 'localhost' Network 为 当前Ip 设置后Local、Network统一为设置后host
    port: "",
    https: false, //是否开启 https
    hotOnly: true, //host 是否唯一
    open: true, //是否自动打开浏览器
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: "https://enmonster-web.oss-cn-shanghai.aliyuncs.com",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      },
      "/loc": {
        target: "http://localhost:8080/",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/loc": ""
        }
      }
    },
    before: app => {}
  },
  // 第三方插件的选项
  pluginOptions: {}
};
