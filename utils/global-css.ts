import { rem } from ".";
import { setGlobalStyle } from "./smart-style";

setGlobalStyle({
  page: {
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    minHeight: "100vh",
  },
  'example-item': {
    marginBottom: rem(20),
    '&:last-child': {
      marginBottom: 0,
    }
  },
  'example-item__desc': {
    marginBottom: rem(12),
    color: "#333",
    fontSize: rem(24),
  },
  'demo-btn': {
    position: "relative",
    display: "inline-block",
    padding: `${rem(12)} ${rem(24)}`,
    color: "#78A4F4",
    fontSize: rem(28),
    textAlign: "center",
    borderRadius: rem(8),
    border: "1px solid #78A4F4",
    overflow: "hidden",
  },
  'subitem': {
    display: "inline-block",
    marginLeft: rem(32),
    verticalAlign: "middle",
    '&:first-child': {
      marginLeft: 0,
    }
  },
  'doc-body': {
    paddingBottom: `calc(env(safe-area-inset-bottom) + ${rem(60)})`
  },
  'panel': {
    margin: `${rem(80)} 0 ${rem(56)}`,
    '&:first-child': {
      marginTop: rem(40)
    }
  },
  'panel__title': {
    position: "relative",
    marginBottom: rem(40),
    paddingLeft: rem(60),
    color: "#7F7F7F",
    fontSize: rem(32),
    fontWeight: "bold",
    lineHeight: 1.5,
  },
  'panel__content': {
    padding: `0 ${rem(60)}`,
  },
  'no-padding': {
    padding: 0
  }
});
