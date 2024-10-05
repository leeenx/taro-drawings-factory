import '../../utils/global-css';
import Taro from '@tarojs/taro';
import Advanced from "./advanced";
import Basic from "./basic";
import DataEntry from "./data-entry";
import Feedback from "./feedback";
import Layout from "./layout";
import Navigation from "./navigation";
import Panel from "./panel";
import View from './view';
import Index from './index/index';
import Article from './article';
import Indexes from './indexes';

export default Index;
export {
  Advanced,
  Basic,
  DataEntry,
  Feedback,
  Layout,
  Navigation,
  Panel,
  View,
  Index,
  Article,
  Indexes,
};

const currentEnv: string = Taro.getEnv();
const targetCacheCount = 3; // 目标数量
// 缓存扩容检查
if (currentEnv === 'WEAPP') {
  getMemoCacheCount(nameSpace).then(cacheCount => {
    // 扩容到 targetCacheCount
    if (cacheCount < targetCacheCount) {
        increaseMemoCache(nameSpace, targetCacheCount - cacheCount);
    }
  });
}
