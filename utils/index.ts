export const rem = (
  runingEnv === 'web'
    ? (px: number) => `${px / 40}rem`
    : (px: number) => `${px}rpx`
);

export * from './smart-style';

export const setPageTitle = (title: string) => {
  if (runingEnv === 'wx_mp') {
    wx?.setNavigationBarTitle({ title });
  } else if (runingEnv === 'web') {
    document.title = title;
  }
}
