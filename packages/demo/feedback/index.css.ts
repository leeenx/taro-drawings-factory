import { rem, createTaroComponentsBindCss } from "~/utils";

export default createTaroComponentsBindCss({
  'indicator-panel': {
    display: "flex",
    alignItems: "center",
    height: rem(375),
    position: "relative",
    backgroundColor: "#fafbfc",
    marginBottom: rem(20),
  },
  'subitem': {
    marginLeft: rem(32),
    flex: "0 0 auto",
    ':first-child': {
      marginLeft: 0,
    }
  },
  'example-item--border': {
    border: "1px solid #e2ecf4",
    borderLeft: "none",
    borderRight: "none",
  },
  'normal': {
    lineHeight: rem(88),
  },
  'panel__content--progress': {
    marginTop: rem(56)
  }
});
