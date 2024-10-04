import { rem } from "~/utils"
const css: Record<string, any> = {
  page: {
    position: 'relative',
    backgroundColor: '#FDFDFD',
    padding: `${rem(60)} 0 ${rem(30)}`,
  },
  logo: {
    margin: '0 auto',
    marginTop: rem(60),
    fontSize: 0,
    textAlign: 'center',
  },
  logoImg: {
    width: rem(264),
    height: rem(180),
  },
  title: {
    marginTop: rem(24),
    color:'#474747',
    fontSize: rem(36),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  list: {
    display: 'flex',
    margin: `${rem(72)} ${rem(40)} ${rem(50)}`,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  item: {
    position: 'relative',
    marginBottom: rem(30),
    padding: rem(40),
    width: rem(320),
    background: '#fff',
    boxShadow: `0 ${rem(8)} ${rem(40)} 0 rgba(0, 0, 0, 0.04)`,
    borderRadius: rem(10),
    boxSizing: 'border-box'
  },
  itemAfter: {
    position: 'absolute',
    top: rem(40),
    right: rem(40),
    display: 'block',
    width: rem(30),
    height: rem(8),
    borderRadius: rem(4),
    background: '#5274A0',
    boxShadow: `${rem(2)} ${rem(2)} ${rem(4)} 0 rgb(82, 116, 160, 0.5)`,
  },
  itemTitle: {
    marginTop: rem(70),
    color: '#484848',
    fontSize: rem(38),
    fontWeight: 'bold',
    lineHeight: 1.2,
  },
  itemContent: {
    marginTop: rem(12),
    color: '#A09EAE',
    fontSize: rem(24),
    lineHeight: 1.5,
  }
}

export default css
