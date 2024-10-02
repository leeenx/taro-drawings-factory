import { rem, createCss } from "../../../utils";

export default createCss({
  'at-article': {
    wordBreak: "break-all",
    wordWrap: "break-word",
    lineHeight: 1.5,
  },
  'at-article__h1': {
    margin: `${rem(30)} ${rem(30)} 0`,
    color: "#333",
    fontSize: rem(48),
    lineHeight: rem(72),
  },
  'at-article__h2': {
    margin: `${rem(30)} ${rem(30)} 0`,
    color: "#333",
    fontSize: rem(40),
    lineHeight: rem(60),
  },
  'at-article__h3': {
    margin: `0 ${rem(30)}`,
    color: "#333",
    fontSize: rem(32),
    lineHeight: rem(48),
  },
  'at-article__p': {
    margin: `${rem(25)} ${rem(30)} 0`,
    color: "#666",
    fontSize: rem(28),
    lineHeight: rem(42),
  },
  'at-article__img': {
    display: "block",
    margin: `${rem(20)} auto 0`,
    width: rem(690),
    borderRadius: rem(4),
  }
});
