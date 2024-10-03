import { rem, createTaroComponentsBindCss } from "../../../utils";

export default createTaroComponentsBindCss({
  'example-item': {
    color: "#333",
    fontSize: rem(28),
  },
  'custom-area': {
    padding: `${rem(80)} ${rem(20)}`,
    fontSize: rem(28),
    textAlign: "center",
    background: "#FCFCFC",
  }
});
