import React, { createElement } from "react";
import type { JSXElementConstructor } from "react";

type Css = (...args) => any;

/**
 * 需要对全局组件做封装
 * 因为有 ::before 与 ::after 两个伪元素
 * 通过对全局组件进行封装后，以下组件将会自动生成【::before】与【::after】:
 * view、text、button、label、cover-view、movable-view
 */
const pseudoComponents: string[] = ['View', 'Text', 'Button', 'Label', 'CoverView', 'MovableView'];
export default function <T>(css: Css, sourceGlobalComponents: T) {
  const Text = sourceGlobalComponents['Text'] as JSXElementConstructor<any>;
  const globalComponents: T = {} as T;

  // 生成有伪类的组件
  const createComponentWithPseudo = (SourceComponent: JSXElementConstructor<any>) => (props: any) => {
    const { className, children, style: rawStyle = {}, $$smartStyleInfo$$, ...others } = props;
    const cssNames = className?.split(/\s+/);
    const style = (() => {
      if (!className) return rawStyle;
      if ($$smartStyleInfo$$) {
        const { isFirst, isLast, isOdd, isEven, currentIndex } = $$smartStyleInfo$$;
        // 表示在迭代循环中，需要按需添加伪类
        const cssNameList: any[] = [];
        cssNames.forEach((cssName) => {
          cssNameList.push(cssName, [`${cssName}:nth-child`, currentIndex]);
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
        return css(...cssNameList, rawStyle);
      }
      return css(...cssNames, rawStyle);
    })();
    const beforeClassList: string[] = [];
    const afterClassList: string[] = [];
    // 返回所有的样式（包括函数）
    const styleSet = css();
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
    // 微信小程序中，SourceComponent 是字符串，所以需要用 createElement 来实现
    return createElement(SourceComponent, {
      className,
      style,
      ...others
    }, [renderBefore(), children, renderAfter()]);
  };

  // 生成没有伪类的组件
  const createComponentWithoutPseudo = (SourceComponent: JSXElementConstructor<any>) => (props: any) => {
    const { $$smartStyleInfo$$, className, style: rawStyle = {}, ...others } = props;
    const cssNames = className?.split(/\s+/);
    const style = className ? css(...cssNames, rawStyle) : rawStyle;
    // 微信小程序中，SourceComponent 是字符串，所以需要用 createElement 来实现
    return createElement(SourceComponent, {
      className,
      style,
      ...others
    });
  };
  
  Object.keys(sourceGlobalComponents as Object).forEach((componentName) => {
    const key: string = componentName;
    const SourceComponent = sourceGlobalComponents[key] as JSXElementConstructor<any>;
    if (pseudoComponents.includes(key)) {
      globalComponents[key] = createComponentWithPseudo(SourceComponent);
    } else {
      globalComponents[key] = createComponentWithoutPseudo(SourceComponent);
    }
  });
  
  return globalComponents;
};