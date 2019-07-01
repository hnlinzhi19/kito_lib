import { isIOS  } from './util';

let schemeUrl = "huyakeke";
if (isIOS && location.origin.indexOf("test") > -1) {
  schemeUrl = "huyakeketest";
}

// 充值
export const chargeAction = () => {
  try {
    let schemeUrl = "huyakeke";
    if (isIOS && location.origin.indexOf("test") > -1) {
      schemeUrl = "huyakeketest";
    }
    location.href = `${schemeUrl}://wallet?cmd=enter_wallet&from=${encodeURIComponent(
      location.href
    )}`;
    console.log("charge");
  } catch (e) {
    console.log(e);
  }
};

/**
 * 去个人主页
 */
export const goUserPage = (uid) => {
  try {
   
    location.href = `${schemeUrl}://wallet?cmd=open_personal_page&uid=${uid}&from=`;
    console.log("jump to homepage",uid);
  } catch (e) {
    console.log(e);
  }
};