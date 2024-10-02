import { rem, createCss } from "../../../utils";

export default createCss({
  'panel__content': {
    marginTop: rem(40),
  },
  'btn-item': {
    marginBottom: rem(20),
    ':last-child': {
      marginBottom: 0
    }
  },
  'subitem': {
    display: "inline-block",
    marginLeft: rem(24),
    ':first-child': {
      marginLeft: 0
    }
  }
});
