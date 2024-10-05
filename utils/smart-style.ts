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
    return style;
  }
  return css;
};
