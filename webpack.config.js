const path = require('path');
const fs =require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const taroH5Container = require('./create-taro-h5-container.ts');
const webpack = require('webpack');

// 保留函数名
const ignoreFNames = [
  '_applyDecoratedDescriptor',
  '_applyDecs',
  '_applyDecs2203',
  '_applyDecs2203R',
  '_applyDecs2301',
  '_applyDecs2305',
  '_arrayLikeToArray',
  '_arrayWithHoles',
  '_arrayWithoutHoles',
  '_assertThisInitialized',
  '_AsyncGenerator',
  '_asyncGeneratorDelegate',
  '_asyncIterator',
  '_asyncToGenerator',
  '_awaitAsyncGenerator',
  '_AwaitValue',
  '_checkInRHS',
  '_checkPrivateRedeclaration',
  '_classApplyDescriptorDestructureSet',
  '_classApplyDescriptorGet',
  '_classApplyDescriptorSet',
  '_classCallCheck',
  '_classCheckPrivateStaticAccess',
  '_classCheckPrivateStaticFieldDescriptor',
  '_classExtractFieldDescriptor',
  '_classNameTDZError',
  '_classPrivateFieldDestructureSet',
  '_classPrivateFieldGet',
  '_classPrivateFieldInitSpec',
  '_classPrivateFieldLooseBase',
  '_classPrivateFieldLooseKey',
  '_classPrivateFieldSet',
  '_classPrivateMethodGet',
  '_classPrivateMethodInitSpec',
  '_classPrivateMethodSet',
  '_classStaticPrivateFieldDestructureSet',
  '_classStaticPrivateFieldSpecGet',
  '_classStaticPrivateFieldSpecSet',
  '_classStaticPrivateMethodGet',
  '_classStaticPrivateMethodSet',
  '_construct',
  '_createClass',
  '_createForOfIteratorHelper',
  '_createForOfIteratorHelperLoose',
  '_createSuper',
  '_decorate',
  '_defaults',
  '_defineAccessor',
  '_defineEnumerableProperties',
  '_defineProperty',
  '_dispose',
  '_extends',
  '_get',
  '_getPrototypeOf',
  '_identity',
  '_inherits',
  '_inheritsLoose',
  '_initializerDefineProperty',
  '_initializerWarningHelper',
  '_instanceof',
  '_interopRequireDefault',
  '_interopRequireWildcard',
  '_isNativeFunction',
  '_isNativeReflectConstruct',
  '_iterableToArray',
  '_iterableToArrayLimit',
  '_iterableToArrayLimitLoose',
  '_jsx',
  '_maybeArrayLike',
  '_newArrowCheck',
  '_nonIterableRest',
  '_nonIterableSpread',
  '_objectDestructuringEmpty',
  '_objectSpread',
  '_objectSpread2',
  '_objectWithoutProperties',
  '_objectWithoutPropertiesLoose',
  '_OverloadYield',
  '_possibleConstructorReturn',
  '_readOnlyError',
  '_regeneratorRuntime',
  '_set',
  '_setPrototypeOf',
  '_skipFirstGeneratorNext',
  '_slicedToArray',
  '_slicedToArrayLoose',
  '_superPropBase',
  '_taggedTemplateLiteral',
  '_taggedTemplateLiteralLoose',
  '_tdz',
  '_temporalRef',
  '_temporalUndefined',
  '_toArray',
  '_toConsumableArray',
  '_toPrimitive',
  '_toPropertyKey',
  '_typeof',
  '_unsupportedIterableToArray',
  '_using',
  '_wrapAsyncGenerator',
  '_wrapNativeSuper',
  '_wrapRegExp',
  '_writeOnlyError',
];

const isDev = process.env.DEV === 'yes';
// host 与 port
const PROTOCOL = isDev ? 'http:' : 'https:';
const HOST = isDev ? '127.0.0.1' : 'www.leeenx.cn';
const PORT = isDev ? 9000 : undefined;
const PATH = process.env.BASE;

const KbsDslParserPlugin = require('kbs-dsl-parser');

let base = process.env.BASE || '';
if (base) base = `/${base}/`;
const publicPath = PORT ? `${PROTOCOL}//${HOST}:${PORT}${base || '/'}` : `${PROTOCOL}//${HOST}${base}`;

console.log('### publicPath', publicPath);

taroH5Container.create(publicPath);

// 默认插件列表，不包含 mpa
const plugins = [
  new webpack.DefinePlugin({
    'process.env.BASE': JSON.stringify(base),
    // 运行时的 publicPath 结尾不带「/」
    'process.env.PUBLIC_PATH': JSON.stringify(publicPath.replace(/\/$/, ''))
  }),
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: taroH5Container.htmlTemplate,
    scriptLoading: 'blocking',
    chunks: ['index'],
    isDev: isDev ? 'yes' : 'no',
    inject: false
  })
];

/**
 * MPA 配置
 * ./src/packages 为 MPA 目录
 */
const mpaDir = path.resolve(__dirname, './packages');
const mapEntries = {
  // h5 环境必须的依赖
  'mount-app': path.resolve(__dirname, './h5-global/mount-app.ts'),
  'h5-global': path.resolve(__dirname, './h5-global/index.ts')
};
if (fs.existsSync(mpaDir)) {
  const dirs = fs.readdirSync(mpaDir);
  dirs.forEach(item => {
    const itemPath = path.resolve(mpaDir, item);
    if (fs.statSync(itemPath).isDirectory()) {
      // 只取目录
      mapEntries[item] = `./packages/${item}`;
      // plugins 加入 mpa 的 html 模板
      plugins.push(
        new HtmlWebpackPlugin({
          template: taroH5Container.htmlTemplate,
          scriptLoading: 'blocking',
          filename: `${item}/index.html`,
          chunks: ['h5-global', 'mount-app', item],
          name: item,
          isDev: isDev ? 'yes' : 'no',
          inject: false
        })
      );
    }
  });
}
plugins.push(taroH5Container.plugin);
// plugins 追加 dsl 格式化插件
plugins.push(
  new KbsDslParserPlugin({
    compress: process.env.COMPRESS === 'yes',
    ignoreFNames,
    watch: process.env.COMPRESS !== 'yes',
    test(name) {
      // dist/js & dist/css & dist/pages 不需要作转换
      return !/(^js\/)|(^css\/)|(^pages\/)|(^h5-global\.\/)|(^mount-app\.\/)/.test(name);
    }
  })
);

module.exports = {
  mode: 'production', // development | production | none
  entry: mapEntries,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[chunkhash].js', // 使用 chunkhash 是为了优化 mpa
    libraryTarget: 'umd',
    library: `webPackageApp$[name]`,
    environment: {
      arrowFunction: false,
      const: false
    },
    publicPath
  },
  optimization: {
    minimize: process.env.COMPRESS === 'yes',
    minimizer: [new TerserPlugin({
      terserOptions: {
        keep_fnames: new RegExp(ignoreFNames.join('|'))
      }
    })]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.wasm'],
    alias: {
      '~': path.resolve(__dirname, './')
    }
  },
  module: {
    rules: [
      {
        // test: /\.(ts|tsx)$/,
        test: (filename) => {
          if (/\.3rd\.js$/.test(filename)) {
            // .3rd.js 表示不需要打包
            return false;
          }
          return /\.(js|ts|jsx|tsx)$/.test(filename);
        },
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  "useBuiltIns": "usage",
                  "corejs": "3"
                }
              ],
              "@babel/preset-react",
              "@babel/preset-typescript"
            ],
            "plugins": [
              "@babel/plugin-transform-runtime"
            ]
          }
        },
        exclude: /node_modules/, //排除 node_modules 目录
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|json)$/i,
        exclude: /node_modules/,
        type: 'asset/resource',
        parser: {
          dataurlCondition: {
            maxSize: 8192
          }
        }
      }
    ],
  },
  externals({ context, request }, callback) {
    // Taro-H5 运行环境自带以下依赖，不需要安装
    const taroH5ExternalConfig = {
      react: {
        commonjs: 'react',
        commonjs2: 'react',
        root: 'React'
      },
      '@tarojs/components': {
        commonjs: '@tarojs/components',
        commonjs2: '@tarojs/components',
        root: 'TaroComponents'
      },
      '@tarojs/taro': {
        commonjs: '@tarojs/taro',
        commonjs2: '@tarojs/taro',
        root: 'Taro',
      },
      'taro-ui': {
        commonjs: 'taro-ui',
        commonjs2: 'taro-ui',
        root: 'TaroUI'
      }
    };
    // Taro-weapp 安装的依赖，需要安装
    const taroWeappExternalConfig = { };
    const currentWeappExternalConfig = taroWeappExternalConfig[request];
    if (currentWeappExternalConfig && /\/h5-global\/index\.ts$/.test(context)) {
      // 在 h5-global/index.ts 文件里，需要正常安装小程序的依赖
      callback();
      return ;
    }
    const currentConfig = taroH5ExternalConfig[request] || currentWeappExternalConfig;
    // 在外部依赖下，处理
    if (currentConfig) return callback(null, currentConfig);
    callback();
  },
  plugins,
  performance: {
    maxAssetSize: 20000000, // 整数类型（以字节为单位）
	  maxEntrypointSize: 400000, // 整数类型（以字节为单位）
  },
  devServer: {
    compress: true,
    hot: false,
    client: false,
    port: PORT,
  }
}
