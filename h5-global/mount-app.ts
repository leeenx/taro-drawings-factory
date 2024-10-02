let pageKey = getParam('page');
if (pageKey) {
  pageKey = pageKey.replace(/[-_]+|^(.)?/g, (match, letter) => letter.toUpperCase());
  pageKey = pageKey.replace(/^\w/, pageKey[0].toUpperCase());
} else {
  pageKey = 'default';
}
const webPackageApp = document.getElementById('webPackageApp')?.getAttribute?.('name');
if (webPackageApp) {
  const currentApp = (window as any)?.[webPackageApp]?.[pageKey];
  Object.assign(window, {
    '$$currentWebPackagePageComponent$$': currentApp
  });
  document.dispatchEvent(new CustomEvent('web-package-page-change', { detail: { component: currentApp } }))
}
