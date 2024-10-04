import { rem, createTaroComponentsBindCss } from "~/utils";

const taroComponents = createTaroComponentsBindCss({
  'at-row': {
    marginBottom: rem(40),
  },
  'at-col': {
    padding: `${rem(18)} ${rem(16)}`,
    color: "#FFF",
    fontSize: rem(28),
    textAlign: "center",
    ':nth-child(odd)': {
      backgroundColor: "#5274A0",
    },
    ':nth-child(even)': {
      backgroundColor: "#7590b3",
    },
  },
  'example-item--card': {
    marginTop: rem(48),
  }
});

export default taroComponents;
