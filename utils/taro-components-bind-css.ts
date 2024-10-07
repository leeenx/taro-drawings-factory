import { createCss } from "./smart-style";
import * as TaroComponents from '@tarojs/components';
import componentBindCss from './component-bind-css';

import type { StyleSet } from "./smart-style";

type Css = (...args) => any;

const taroComponentBindCss = (css: Css) => {
    return componentBindCss<typeof TaroComponents>(css, TaroComponents);
};

export default (styleSet: StyleSet) => taroComponentBindCss(createCss(styleSet));
