// 执行map的数组长度
let currentArrayLen = 0;
// 执行 map 当前的迭代索引
let currentIndex = -1;
let isFirst = false;
let isLast = false;
let isOdd = false;
let isEven = false;
// map 执行队列，因为 map 存在嵌套
const parentMapInfoQueue: {
  length: number;
  index: number;
  first: boolean;
  last: boolean;
  odd: boolean;
  even: boolean;
}[] = [];

type InteralCallback = (item: any, index: number) => any;

export const listMap = function(list: any[], iteralCallback: InteralCallback) {
  if (currentArrayLen) {
    // 表示 map 嵌套，保存父级信息
    parentMapInfoQueue.push({
      length: currentArrayLen,
      index: currentIndex,
      first: isFirst,
      last: isLast,
      odd: isOdd,
      even: isEven,
    })
  }
  currentArrayLen = list.length || 0;
  const result: any[] = list.map(function(item: any, index: number) {
    currentIndex = index;
    isOdd = index % 2 === 0;
    isEven = !isOdd;
    isFirst = index === 0;
    isLast = index === currentArrayLen - 1;
    const node = iteralCallback(item, index);
    try {
      Object.assign(node.props, {
        $$smartStyleInfo$$: {
          currentArrayLen,
          currentIndex,
          isOdd,
          isEven,
          isFirst,
          isLast,
        }
      });
    } catch (err) {
      console.warn('smart-style-info 添加失败，部分样式可能失效');
    }
    return node;
  });
  if (parentMapInfoQueue.length) {
    const { length, index, first, last, odd, even } = parentMapInfoQueue.pop()!;
    currentIndex = index;
    currentArrayLen = length;
    isFirst = first;
    isLast = last;
    isOdd = odd;
    isEven = even;
  } else {
    // 恢复到默认值
    currentIndex = -1;
    currentArrayLen = 0;
    isFirst = false;
    isLast = false;
    isOdd = false;
    isEven = false;
  }
  return result;
}
type PureStyle = Record<string, string | number>;
type FnStyle = (...args) => PureStyle | undefined;
type Style = Record<string, string | number | PureStyle | FnStyle> | FnStyle;
type PureStyleSet = Record<string, PureStyle>;
type NthSet = Record<string, FnStyle>;
export type StyleSet = Record<string, Style>;

// 全局样式集合
const globalStyleSet: PureStyleSet = {};

// 全局样式里的 FnStyle
const globalStyleFnSet: Record<string, FnStyle> = {};

const pickStyleSet = (sourceStyle: StyleSet, pureStyleSet: PureStyleSet, fnStyleSet: NthSet) => {
  const categorize = (key: string, style: Style, pureStyle: PureStyle) => {
    Object.entries(style).forEach(([styleKey, styleValue]) => {
      if (typeof styleValue === 'function') {
        /**
         * 表示函数类
         * 这个条件作为第一个条件是因为函数类优先；
         * 针对伪类或伪元素是一个函数表达时有用。
         */
        if (styleKey.startsWith('&:')) {
          // 表示 :nth-child 伪类
          fnStyleSet[`${key}${styleKey.replace('&', '')}`] = styleValue;
        } else {
          fnStyleSet[`${key}${styleKey}`] = styleValue;
        }
      } else if (
        [
          ':first-child',
          ':last-child',
          ':nth-child(odd)',
          ':nth-child(even)',
          ':before',
          '::before',
          ':after',
          '::after',
        ].includes(styleKey)
      ) {
        // 伪类 或 伪元素
        pureStyleSet[`${key}${styleKey}`] = styleValue as PureStyle;
      } else if (styleKey.startsWith('&')) {
        // 支持父级选择器后，会存在多级嵌套
        const cssKey = `${key}${styleKey.replace('&', '')}`;
        const curPureStyle: PureStyle = {};
        categorize(cssKey, styleValue as Style, curPureStyle);
        pureStyleSet[cssKey] = curPureStyle;
      }
      else {
        pureStyle[styleKey] = styleValue as string;
      }
    });
  };
  Object.entries(sourceStyle).forEach(([key, style]) => {
    if(typeof style === 'function') {
      fnStyleSet[key] = style;
    } else {
      pureStyleSet[key] = (() => {
        const pureStyle: PureStyle = {};
        categorize(key, style, pureStyle);
        return pureStyle;
      })();
    }
  });
};

// 全局样式
export const setGlobalStyle = (styleSet: StyleSet) => {
  const pureStyleSet: PureStyleSet = {};
  // 提取出纯样式与nth函数
  pickStyleSet(styleSet, globalStyleSet, globalStyleFnSet);
  Object.assign(globalStyleSet, pureStyleSet);
};

// 样式生成函数
export function createCss(styleSet: StyleSet) {
  const pureStyleSet: PureStyleSet = {};
  const fnStyleSet: Record<string, FnStyle> = {};
  pickStyleSet(styleSet, pureStyleSet, fnStyleSet);
  // 将 globalStyleSet 与 pureStyleSet 合并生成新的对象
  const mergeStyleSet: PureStyleSet = {};
  Object.entries(globalStyleSet).forEach(([key, value]) => {
    mergeStyleSet[key] = Object.assign({}, value);
  });
  Object.entries(pureStyleSet).forEach(([key, value]) => {
    if (mergeStyleSet[key]) Object.assign(mergeStyleSet[key], value);
    else mergeStyleSet[key] = Object.assign({}, value);
  });
  // 将 globalStyleFnSet 与 fnStyleSet 合并
  const mergeFnStyleSet: Record<string, FnStyle> = {};
  Object.entries(globalStyleFnSet).forEach(([key, value]) => {
    mergeFnStyleSet[key] = value;
  });
  Object.entries(fnStyleSet).forEach(([key, value]) => {
    if (globalStyleFnSet[key]) {
      mergeFnStyleSet[key] = (index: number) => Object.assign(globalStyleFnSet[key](index) || {}, value(index));
    } else {
      mergeFnStyleSet[key] = value;
    }
  });
  const css = (...args) => {
    if (!args.length) return Object.assign({}, mergeStyleSet, mergeFnStyleSet);
    const keys = args as string[]
    if (keys.length > 1) {
      const styles: PureStyle[] = keys.map(item => css(item));
      return Object.assign({}, ...styles);
    }
    const key = keys[0];
    // 表示入参是一段样式，直接返回
    if (!Array.isArray(key) && typeof key === 'object') {
      return key;
    }
    const style = (() => {
      if (Array.isArray(key)) {
        // 数组，表示当前是一个函数类调用
        const [fn, ...args] = key;
        return mergeFnStyleSet[fn]?.(...args);
      }
      return mergeFnStyleSet[key]?.() || mergeStyleSet[key];
    })();
    if (currentIndex < 0) {
      // 普通的提取样式
      return style;
    }
    const mergeStyle = Object.assign({}, style, mergeFnStyleSet[`${key}:nth-child`]?.(currentIndex) || {});
    const firstChild = `${key}:first-child`;
    const lastChild = `${key}:last-child`;
    const oddChild = `${key}:nth-child(odd)`;
    const evenChild = `${key}:nth-child(even)`;
    if (isOdd && mergeStyle[oddChild]) {
      Object.assign(mergeStyle, mergeStyleSet[oddChild]);
    }
    if (isEven && mergeStyle[evenChild]) {
      Object.assign(mergeStyle, mergeStyleSet[evenChild]);
    }
    if (isFirst && mergeStyleSet[firstChild]) {
      Object.assign(mergeStyle, mergeStyleSet[firstChild]);
    }
    if (isLast && mergeStyleSet[lastChild]) {
      Object.assign(mergeStyle, mergeStyleSet[lastChild]);
    }
    // 调用 nth 函数
    return mergeStyle;
  }
  return css;
};
