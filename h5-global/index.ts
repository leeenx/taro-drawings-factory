/**
 * h5 需要用到的依赖，即 webpack.config 上配置的 externals 需要在这里引用，否则H5环境无法运行
 * react, lodash
 */
import * as React from 'react';
import * as lodash from 'lodash';

const navigate = (page, params) => {
  let url = page;
  if (params && typeof params === "object") {
    let query = JSON.stringify(params);
    if (url.indexOf('?') !== -1) {
      url = `${page}&params=${query}`;
    } else {
      url = `${page}?params=${query}`;
    }
  }
  location.href = url;
};
const getParams = () => {
  const url = new URL(location.href);
  const params = url.searchParams.get('params');
  if (params) {
    return JSON.parse(decodeURIComponent(params));
  }
  return {};
};
const getParam = (key) => {
  const params = getParams();
  return params[key];
};

const wx = {};
const env = 'web';

const taroH5Utils = {
  React,
  lodash,
  navigate,
  getParams,
  getParam,
  wx,
  env,
}

// 注册到全局
Object.assign(window, taroH5Utils, { taroH5Utils, runingEnv: 'web' });
