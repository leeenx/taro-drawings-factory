declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
declare module '~*'

declare function navigate(route: string, params?: any, config?: { headless?: boolean; replace?: boolean; }): Promise<void>;
declare const currentPage: WechatMiniprogram.Page.Instance<WechatMiniprogram.IAnyObject, WechatMiniprogram.IAnyObject>;
declare function getCurrentPage(): WechatMiniprogram.Page.Instance<WechatMiniprogram.IAnyObject, WechatMiniprogram.IAnyObject>;
declare function getParams(): Record<string, string | undefined>;
declare function getParam(key: string): string | undefined;
declare function getCurrentParams(): Record<string, string | undefined>;
declare function getCurrentParam(key: string): string | undefined;
declare function getDslUrl(route: string): string;
declare function createWxMpRoute(route: string, params: any, headless: boolean): string;

// 扩展 JSX
declare namespace JSX {
  interface IntrinsicElements {
    'wx-cover-image': any;
    'wx-cover-view': any;
    'wx-match-media': any;
    'wx-movable-area': any;
    'wx-movable-view': any;
    'wx-scroll-view': any;
    'wx-swiper': any;
    'wx-swiper-item': any;
    'wx-view': any;
    'wx-icon': any;
    'wx-progress': any;
    'wx-text': any;
    'wx-button': any;
    'wx-editor': any;
    'wx-form': any;
    'wx-picker': any;
    'wx-picker-view': any;
    'wx-picker-view-column': any;
    'wx-slider': any;
    'wx-switch': any;
    'wx-navigator': any;
    'wx-camera': any;
    'wx-image': any;
    'wx-live-player': any;
    'wx-live-pusher': any;
    'wx-voip-room': any;
    'wx-map': any;
    'wx-ad': any;
    'wx-official-account': any;
    'wx-open-data': any;
    'wx-web-view': any;
  }
}

declare const nameSpace: number;
declare const runingEnv: 'wx_mp' | 'web';
