//打包配置文件
module.exports = {
    // 执行 npm run build 统一配置文件路径（本地访问dist/index.html需'./'）
    assetsDir: 'static',
    parallel: false,
    publicPath: './',
    
    transpileDependencies: [
      'vuetify'
    ],
    
}
  