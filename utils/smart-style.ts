import _ from 'lodash';

type PureStyle = Record<string, string | number>;
type FnStyle = (...args) => PureStyle | undefined;
type Style = Record<string, string | number | PureStyle | FnStyle> | FnStyle;
type PureStyleSet = Record<string, PureStyle>;
type NthSet = Record<string, FnStyle>;
type CascadeStyleSet = Record<string, {
  parent: string[];
  style: PureStyle;
}[]>;

type CascadeFnStyleSet = Record<string, {
  parent: string[];
  styleFn: FnStyle;
}[]>;

export type StyleSet = Record<string, Style>;

// 全局样式集合
const globalStyleSet: PureStyleSet = {};

// 全局样式里的 FnStyle
const globalStyleFnSet: Record<string, FnStyle> = {};

// 全局样式里的 cascadeStyle
const globalCascadeStyleSet: CascadeStyleSet= {};

// 全局样式里的 cascadeFnStyle
const globalCascadeFnStyle: CascadeFnStyleSet = {};

const pickStyleSet = (
  sourceStyle: StyleSet, // 源样式集
  pureStyleSet: PureStyleSet, // 纯样式集
  fnStyleSet: NthSet, // 函数类样式集
  cascadeStyleSet: CascadeStyleSet, // 级联纯样式集
  cascadeFnStyleSet: CascadeFnStyleSet,
) => {
  const categorize = (key: string, style: Style, pureStyle: PureStyle, parent: string[] = []) => {
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
          // 级联，子级样式
          fnStyleSet[`${key}${styleKey}`] = styleValue;
        }
      } else if (styleKey.startsWith('&')) {
        // 支持父级选择器后，会存在多级嵌套
        const cssKey = `${key}${styleKey.replace('&', '')}`;
        const curPureStyle: PureStyle = {};
        categorize(cssKey, styleValue as Style, curPureStyle);
        pureStyleSet[cssKey] = curPureStyle;
      } else if (_.isObject(styleValue)) {
        // 级联，子级样式

      } else {
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
  pickStyleSet(styleSet, globalStyleSet, globalStyleFnSet, globalCascadeStyleSet, globalCascadeFnStyle);
  Object.assign(globalStyleSet, pureStyleSet);
};

// 样式生成函数
export function createCss(styleSet: StyleSet) {
  const pureStyleSet: PureStyleSet = {};
  const fnStyleSet: Record<string, FnStyle> = {};
  const cascadeStyleSet: CascadeStyleSet = {};
  const cascadeFnStyleSet: CascadeFnStyleSet = {};
  pickStyleSet(styleSet, pureStyleSet, fnStyleSet, cascadeStyleSet, cascadeFnStyleSet);
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
    if (!args.length) {
      return Object.assign({
        $$getCascadeStyle$$(key: string, parentClassList: string[][]) {
          const cascadeStyleList = cascadeStyleSet[key];
          const cascadeFnStyleList = cascadeFnStyleSet[key];
          // 没有级联，直接返回 null
          if (!cascadeStyleList?.length && !cascadeFnStyleList?.length) return null;
          const mergeCascadeStyle: PureStyle = {};
          if (cascadeStyleList?.length) {
            // 有内联样式
            cascadeStyleList.forEach(({ parent, style }) => {
              let startIndex = 0;
              const isMatched = parent.every(item => parentClassList.every(classList => {
                const len = classList.length;
                for (let i = startIndex; i < len; ++i) {
                  if (classList[i].includes(item)) {
                    startIndex = i + 1; // 更新下一次的起始索引
                    return true;
                  }
                }
                return false;
              }));
              if (isMatched) {
                // 表示找到级联样式了
                Object.assign(mergeCascadeStyle, style);
              }
            });
          }
          if (cascadeFnStyleList?.length) {
            // 有内联类样式
            
          }
        },
      }, mergeStyleSet, mergeFnStyleSet);
    };
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
