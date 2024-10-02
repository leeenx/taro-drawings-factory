// Taro-H5 的运行环境
const path = require('path');
const fs =require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const destination = path.resolve(__dirname, './dist/');
const npmWebPackageTaroH5Dir = path.resolve(__dirname, './node_modules/web-package-taro-h5/dist/');
const webPackageTaroH5Dir = path.resolve(__dirname, './.web-package-taro-h5/');
const htmlTemplate = `${webPackageTaroH5Dir}/pages/index/index.html`;
const versionFile = `${webPackageTaroH5Dir}/.version`;

// 获取当前目录下的 package.json 路径
const packageJsonPath = path.resolve(__dirname, 'package.json');

// 读取 package.json 文件并将内容解析为 JSON 对象
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

const webPackageTaroH5Version = packageJson?.dependencies?.["web-package-taro-h5"];

// 复制目录
function copyDir(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });

  fs.mkdirSync(dest, { recursive: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 初始化目录
const initWebPackageTaroH5Dir = () => {
  // 创建目录
  fs.mkdirSync(webPackageTaroH5Dir);
  // 复制目录
  copyDir(npmWebPackageTaroH5Dir, webPackageTaroH5Dir);
  const htmlTemplateContent = fs.readFileSync(htmlTemplate, 'utf-8');
  const injectScript = `
  <% var jsFiles = [] %>
  <% for (var index in htmlWebpackPlugin.files.js) { jsFiles.push(htmlWebpackPlugin.files.js[index]) }%>
  <% if (jsFiles.length) jsFiles.push(jsFiles.shift()) %>
  <% for(var index = 0; index < jsFiles.length; ++index) {%>
    <% if(index === 0 || index === jsFiles.length - 1) { %>
      <script type="text/javascript" defer src="<%=jsFiles[index] %>"></script>
    <% } else { %>
      <script type="text/javascript" defer id="webPackageApp" name="webPackageApp$<%= htmlWebpackPlugin.options.name %>" src="<%=jsFiles[index] %>" mp-web-package-url="<%=jsFiles[index].replace(/\.js$/, '.dsl.json') %>"></script>
    <% } %>
  <% } %>
  <% if(htmlWebpackPlugin.options.isDev === "yes"){ %>
  <script>
    var ws = new WebSocket("ws://localhost:9900");
    ws.onopen = function() {
      console.log('websocket服务链接打开');
    };
    ws.onmessage = function(e) {
      console.log('------收到更新：', e.data);
      location.reload();
    }
  </script>
  <% } %>`;
  const newHtmlTemplateContent = htmlTemplateContent.replace('</body></html>', `${injectScript}</body></html>`);
  fs.writeFileSync(htmlTemplate, newHtmlTemplateContent);
  fs.writeFileSync(versionFile, webPackageTaroH5Version);
};

try {
  fs.accessSync(npmWebPackageTaroH5Dir);
} catch (err) {
  console.error(err);
  throw new Error("缺少关键依赖：「web-package-taro-h5」，请安装");
}
if (!webPackageTaroH5Version) {
  // 报错
  throw new Error("缺少关键依赖：「web-package-taro-h5」，请安装");
} else {
  try {
    fs.accessSync(versionFile);
    const cacheVersion = fs.readFileSync(versionFile, 'utf-8');
    if (cacheVersion !== webPackageTaroH5Version) {
      // 需要删除
      fs.rmdirSync(npmWebPackageTaroH5Dir);
      // 重新生成新的缓存
      initWebPackageTaroH5Dir();
    }
  } catch {}
}

try {
  fs.accessSync(webPackageTaroH5Dir);
} catch (err) {
  // 初始化目录
  initWebPackageTaroH5Dir();
}

module.exports = {
  htmlTemplate: './.web-package-taro-h5/pages/index/index.html',
  plugin: new CopyWebpackPlugin({
    patterns: [{
      from: webPackageTaroH5Dir,
      to: destination
    }],
    options: {
      concurrency: 100,
    }
  })
};
