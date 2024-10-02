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

type InteralCallback = (item: any, index: number) => {};

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
    return iteralCallback(item, index);
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
    currentIndex = -1;
    currentArrayLen = 0;
  }
  return result;
}
type PureStyle = Record<string, string | number>;
type NthFunction = (index: number) => PureStyle | undefined;
type Style = Record<string, string | number | PureStyle | NthFunction>;
type PureStyleSet = Record<string, PureStyle>;
type NthSet = Record<string, NthFunction>;
type StyleSet = Record<string, Style>;

// 全局样式集合
const globalStyleSet: PureStyleSet = {};

// 全局样式里的 NthFunction
const globalStyleNthSet: Record<string, NthFunction> = {};

const pickStyleSet = (sourceStyle: StyleSet, pureStyleSet: PureStyleSet, nthSet: NthSet) => {
  const categorize = (key: string, style: Style, pureStyle: PureStyle) => {
    Object.entries(style).forEach(([styleKey, styleValue]) => {
      if (typeof styleValue === 'function') {
        /**
         * 表示函数类，一般都是以「:」/「::」开头
         * 这个条件作为第一个条件是因为函数类优先；
         * 针对伪类或伪元素是一个函数表达时有用。
         */
        nthSet[`${key}${styleKey}`] = styleValue;
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
    pureStyleSet[key] = (() => {
      const pureStyle: PureStyle = {};
      categorize(key, style, pureStyle);
      return pureStyle;
    })();
  });
};

export const setGlobalStyle = (styleSet: StyleSet) => {
  const pureStyleSet: PureStyleSet = {};
  // 提取出纯样式与nth函数
  pickStyleSet(styleSet, globalStyleSet, globalStyleNthSet);
  Object.assign(globalStyleSet, pureStyleSet);
};

// 样式生成函数
export const createCss = (styleSet: StyleSet) => {
  const pureStyleSet: PureStyleSet = {};
  const nthSet: Record<string, NthFunction> = {};
  pickStyleSet(styleSet, pureStyleSet, nthSet);
  // 将 globalStyleSet 与 pureStyleSet 合并生成新的对象
  const mergeStyleSet: PureStyleSet = {};
  Object.entries(globalStyleSet).forEach(([key, value]) => {
    mergeStyleSet[key] = Object.assign({}, value);
  });
  Object.entries(pureStyleSet).forEach(([key, value]) => {
    if (mergeStyleSet[key]) Object.assign(mergeStyleSet[key], value);
    else mergeStyleSet[key] = Object.assign({}, value);
  });
  // 将 globalStyleNthSet 与 nthSet 合并
  const mergeNthSet: Record<string, NthFunction> = {};
  Object.entries(globalStyleNthSet).forEach(([key, value]) => {
    mergeNthSet[key] = value;
  });
  Object.entries(nthSet).forEach(([key, value]) => {
    if (globalStyleNthSet[key]) {
      mergeNthSet[key] = (index: number) => Object.assign(globalStyleNthSet[key](index) || {}, value(index));
    } else {
      mergeNthSet[key] = value;
    }
  });
  const css = (...args) => {
    const keys = args as string[]
    if (keys.length > 1) {
      const styles: PureStyle[] = keys.map(item => css(item));
      return Object.assign({}, ...styles);
    }
    const key = keys[0];
    if (typeof key === 'object') {
      return key;
    }
    const style = mergeStyleSet[key];
    if (currentIndex < 0) {
      // 普通的提取样式
      return style;
    }
    const mergeStyle = Object.assign({}, style, mergeNthSet[`${key}:nth-child`]?.(currentIndex) || {});
    const firstChild = `${key}:first-child`;
    const lastChild = `${key}:last-child`;
    const oddChild = `${key}:nth-child(odd)`;
    const evenChild = `${key}:nth-child(even)`;
    if (isFirst && mergeStyleSet[firstChild]) {
      Object.assign(mergeStyle, mergeStyleSet[firstChild]);
    }
    if (isLast && mergeStyleSet[lastChild]) {
      Object.assign(mergeStyle, mergeStyleSet[firstChild]);
    }
    if (isOdd && mergeStyle[oddChild]) {
      Object.assign(mergeStyle, mergeStyleSet[oddChild]);
    }
    if (isOdd && mergeStyle[evenChild]) {
      Object.assign(mergeStyle, mergeStyleSet[evenChild]);
    }
    // 调用 nth 函数
    return mergeStyle;
  }
  return css;
};
