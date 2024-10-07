import { rem, createTaroComponentsBindCss } from "../../utils";

const css: Record<string, any> = {
  'doc-header': {
    position: 'relative',
    padding: `${rem(100)} ${rem(60)} ${rem(30)}`,
    '&::after': {
      content: '',
      display: 'block',
      position: 'absolute',
      top: rem(60),
      right: rem(60),
      width: rem(60),
      height: rem(10),
      borderRadius: rem(5),
      background: '#5274A0',
      boxShadow: `${rem(2)} ${rem(2)} ${rem(4)} 0 rgba(82, 116, 160, 0.5)`
    },
    '&__title': {
      color: '#040404',
      fontSize: rem(42),
      fontWeight: 'bold',
      lineHeight: 1.5,
    },
    '&__desc': {
      marginTop: rem(12),
      color: '#A09EAE',
      fontSize: rem(30),
      lineHeight: 1.5,
    }
  },
};
export default createTaroComponentsBindCss(css);
