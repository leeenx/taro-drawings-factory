import { rem, createTaroComponentsBindCss } from "../../utils";

export default createTaroComponentsBindCss({
  'demo-goto-btn': {
    // #5274A0
    position: "relative",
    display: "inline-block",
    padding: `${rem(12)} ${rem(70)} ${rem(12)} ${rem(24)}`,
    color: "#fff",
    fontSize: rem(28),
    textAlign: "center",
    borderRadius: rem(8),
    background: "#5274A0",
    overflow: "hidden",
    '&::after': {
      content: '→',
      position: "absolute",
      top: 0,
      right: 0,
      display: "flex",
      alignItems: "center",
      padding: `0 ${rem(12)}`,
      height: "100%",
      background: "#345B8F",
    }
  },
});
