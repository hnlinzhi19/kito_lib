const u = navigator.userAgent;
const app = navigator.appVersion;
export const  isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
export const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
