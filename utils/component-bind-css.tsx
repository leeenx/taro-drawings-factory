import { createElement, memo } from "react";
import _ from 'lodash';
import type { JSXElementConstructor } from "react";

type Css = (...args) => any;

/**
 * 需要对全局组件做封装
 * 因为有 ::before 与 ::after 两个伪元素
 * 通过对全局组件进行封装后，以下组件将会自动生成【::before】与【::after】:
 * view、text、button、label、cover-view、movable-view
 */
const defaultPseudoComponentMapping: Record<string, string> = {
  View: 'View',
  Text: 'Text',
  Button: 'Button',
  Label: 'Label',
  CoverView: 'CoverView',
  MovableView: 'MovableView',
  MovableArea: 'MovableArea',
  Swiper: 'Swiper',
  SwiperItem: 'SwiperItem',
  MatchMedia: 'MatchMedia',
};
export default function <T>(css: Css, sourceGlobalComponents: T, containerComponentMapping = defaultPseudoComponentMapping) {
  const textComponentName = containerComponentMapping.Text;
  const Text = sourceGlobalComponents[textComponentName] as JSXElementConstructor<any>;
  const pseudoComponentNames = Object.values(containerComponentMapping);
  const globalComponents: T = {} as T;

  // 返回所有的样式（包括函数）
  const styleSet = css();

  // 缓存样式
  const memoCascadeStyleSet: Record<string, any> = {};

  const getMemoCascadeStyle = (memoId: string, createMemoStyle: () => any) => {
    let memoStyle: any = memoCascadeStyleSet[memoId];
    if (!memoStyle) {
      memoStyle = memoCascadeStyleSet[memoId] = createMemoStyle();
    }
    return memoStyle;
  };

  // 生成有伪类的组件
  const createContainerComponent = (SourceComponent: JSXElementConstructor<any>) => memo((props: any) => {
    const {
      className,
      children,
      style: rawStyle = {},
      nthChild,
      $$nthChildInfo$$,
      $$parentMemoId$$ = '',
      $$parentClassList$$ = [],
      ...others
    } = props;
    const cssNames = className?.split(/\s+/);
    const parentClassList: string[][] = [...$$parentClassList$$];
    let memoId: string = `${className}#1`;
    const style = (() => {
      if (!className) return rawStyle;
      let resultStyle: any = {};
      const nthChildInfo = nthChild || $$nthChildInfo$$;
      if (nthChildInfo) {
        const { isFirst, isLast, isOdd, isEven, currentIndex } = nthChildInfo;
        // 表示在迭代循环中，需要按需添加伪类
        const cssNameList: any[] = [];
        cssNames.forEach((cssName) => {
          cssNameList.push(cssName, [`${cssName}:nth-child`, currentIndex]);
          cssNameList.push(`${cssName}:nth-child(${currentIndex + 1})`);
          if (isOdd) {
            cssNameList.push(`${cssName}:nth-child(odd)`);
          }
          if (isEven) {
            cssNameList.push(`${cssName}:nth-child(even)`);
          }
          if (isFirst) {
            cssNameList.push(`${cssName}:first-child`);
          }
          if (isLast) {
            cssNameList.push(`${cssName}:last-child`);
          }
        });
        if (cssNameList.length) {
          // 生成缓存 id
          const currentNodeMemoId = `${className}#${currentIndex}`;
          memoId = $$parentMemoId$$ ? `${$$parentMemoId$$}|${currentNodeMemoId}` : currentNodeMemoId;
          resultStyle = getMemoCascadeStyle(memoId, () => {
            const currentClassList = cssNameList.filter(item => !Array.isArray(item));
            let cascadeStyleList: any[] = [];
            currentClassList.forEach(className => {
              const cascadeStyle = styleSet.$$getCascadeStyle$$(className, parentClassList, currentIndex);
              if (cascadeStyle) {
                cascadeStyleList.push(cascadeStyle);
              }
            });
            parentClassList.push(currentClassList);
            return css(...cssNameList, ...cascadeStyleList);
          });
        }
      } else if (cssNames.length) {
        // 根节点会进这个分支
        parentClassList.push(cssNames);
        resultStyle = getMemoCascadeStyle(memoId, () => css(...cssNames));
      }
      return  resultStyle ? Object.assign(resultStyle, rawStyle) : rawStyle;
    })();
    const beforeClassList: string[] = [];
    const afterClassList: string[] = [];
    cssNames?.forEach(cssName => {
      const beforeClass = `${cssName}::before`;
      const afterClass = `${cssName}::after`;
      if (styleSet.hasOwnProperty(beforeClass)) {
        // 有 before
        beforeClassList.push(beforeClass);
      }
      if (styleSet.hasOwnProperty(afterClass)) {
        // 有 after
        afterClassList.push(afterClass);
      }
    });
    const renderBefore = () => {
      if (!beforeClassList.length) return null;
      const beforeStyle = css(...beforeClassList);
      if (!beforeStyle.hasOwnProperty('content')) return null;
      const content = beforeStyle.content;
      return <Text style={beforeStyle} data-pseudo="::before">{content}</Text>;
    };
    const renderAfter = () => {
      if (!afterClassList.length) return null;
      const afterStyle = css(...afterClassList);
      if (!afterStyle.hasOwnProperty('content')) return null;
      const content = afterStyle.content;
      return <Text style={afterStyle} data-pseudo="::after">{content}</Text>;
    };
    if (children) {
      const childList = Array.isArray(children) ? children : [children];
      const currentArrayLen = childList.length;
      const lastIndex = currentArrayLen - 1;
      let currentIndex = 0;
      childList.forEach(child => {
        if (_.isObject(child.props)) {
          const isOdd = currentIndex % 2 === 0;
          const isEven = !isOdd;
          const isFirst = currentIndex === 0;
          const isLast = currentIndex === lastIndex;
          Object.assign(child.props, {
            $$nthChildInfo$$: {
              currentArrayLen,
              currentIndex,
              isOdd,
              isEven,
              isFirst,
              isLast
            },
            $$parentClassList$$: parentClassList,
            $$parentMemoId$$: memoId,
          });
          currentIndex += 1;
        }
      })
    }
    // 微信小程序中，SourceComponent 是字符串，所以需要用 createElement 来实现
    return createElement(SourceComponent, {
      className,
      style,
      nthChild,
      ...others
    }, [renderBefore(), children, renderAfter()]);
  });

  // 生成没有伪类的组件
  const createAtomComponent = (SourceComponent: JSXElementConstructor<any>) => memo((props: any) => {
    const {
      $$nthChildInfo$$,
      nthChild,
      $$parentClassList$$ = [],
      $$parentMemoId$$ = '',
      className,
      style: rawStyle = {},
      ...others
    } = props;
    const cssNames = className?.split(/\s+/);
    // const style = className ? css(...cssNames, rawStyle) : rawStyle;
    const style = (() => {
      if (!className) return rawStyle;
      // 生成缓存 id
      const nthChildInfo = nthChild || $$nthChildInfo$$;
      const { currentIndex = 1 } = nthChildInfo;
      const currentNodeMemoId = `${className}#${currentIndex}`;
      const memoId = $$parentMemoId$$ ? `${$$parentMemoId$$}|${currentNodeMemoId}` : currentNodeMemoId;
      const resultStyle: any = getMemoCascadeStyle(memoId, () => {
        const parentClassList: string[][] = [...$$parentClassList$$];
        const currentClassList = cssNames.filter(item => !Array.isArray(item));
        let cascadeStyleList: any[] = [];
        currentClassList.forEach(className => {
          const cascadeStyle = styleSet.$$getCascadeStyle$$(className, parentClassList, currentIndex);
          if (cascadeStyle) {
            cascadeStyleList.push(cascadeStyle);
          }
        });
        parentClassList.push(currentClassList);
        return css(...cssNames, ...cascadeStyleList);
      });
      return Object.assign(resultStyle, rawStyle);
    })();
    // 微信小程序中，SourceComponent 是字符串，所以需要用 createElement 来实现
    return createElement(SourceComponent, {
      className,
      style,
      nthChild,
      ...others
    });
  });

  Object.keys(sourceGlobalComponents as Object).forEach((componentName) => {
    const key: string = componentName;
    const SourceComponent = sourceGlobalComponents[key] as JSXElementConstructor<any>;
    if (pseudoComponentNames.includes(key)) {
      globalComponents[key] = createContainerComponent(SourceComponent);
    } else {
      globalComponents[key] = createAtomComponent(SourceComponent);
    }
  });

  return globalComponents;
};
