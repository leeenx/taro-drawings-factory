import { rem, createTaroComponentsBindCss } from "../../../utils";

const afterStyle = {
  content: '',
  position: "absolute",
  top: "auto",
  left: 0,
  right: 0,
  bottom: 0,
  transform: "scaleY(0.5)",
  borderBottom: "1px solid #d6e4ef",
  transformOrigin: "center",
  boxSizing: "border-box",
  pointerEvents: "none",
};

const labelStyle = {
  color: "#333",
  fontSize: rem(32),
  lineHeight: 1.5,
};

export default createTaroComponentsBindCss({
  'demo-list-item': {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    padding: rem(24),
    '::before': Object.assign({}, afterStyle, {
      top: 0,
      bottom: 'auto'
    }),
    '::after': Object.assign({}, afterStyle),
    '&__label': labelStyle,
    '&__value': {
      ...labelStyle,
      color: '#999'
    },
  },
  'title-date': {
    margin: `${rem(40)}  0 ${rem(20)}`,
    textAlign: "center",
    fontSize: rem(24),
  }
});
