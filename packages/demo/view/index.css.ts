import { rem, createTaroComponentsBindCss } from "~/utils";

export default createTaroComponentsBindCss({
  'subitem': {
    display: 'inline-block',
    verticalAlign: 'middle',
    ':nth-child'(index: number) {
      if (index > 0) return {
        marginLeft: rem(32),
      };
    }
  },
  'subitem--badge': {
    marginLeft: rem(56),
    '&:first-child': {
      marginLeft: 0,
    }
  },
  'example-item--steps': {
    marginTop: rem(56)
  },
});
