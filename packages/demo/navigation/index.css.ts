import { rem, createTaroComponentsBindCss } from "../../../utils";

export default createTaroComponentsBindCss({
  'tab-content': {
    padding: `${rem(100)} ${rem(50)}`,
    fontSize: rem(30),
    textAlign: "center",
    backgroundColor: "#FAFBFC",
  },
  'tab-content--vertical': {
    height: "200PX",
    padding: "100PX 50",
    fontSize: 30,
    textAlign: "center",
    boxSizing: "border-box",
    backgroundColor: "#FAFBFC",
  }
});
