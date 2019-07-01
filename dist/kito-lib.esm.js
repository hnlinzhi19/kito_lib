const u = navigator.userAgent;
const app = navigator.appVersion;
const  isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

let schemeUrl = "huyakeke";
if (isIOS && location.origin.indexOf("test") > -1) {
  schemeUrl = "huyakeketest";
}

// 充值
const chargeAction = () => {
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
const goUserPage = (uid) => {
  try {
   
    location.href = `${schemeUrl}://wallet?cmd=open_personal_page&uid=${uid}&from=`;
    console.log("jump to homepage",uid);
  } catch (e) {
    console.log(e);
  }
};

function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(WebViewJavascriptBridge);
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement("iframe");
  WVJBIframe.style.display = "none";
  WVJBIframe.src = "https://__bridge_loaded__";
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function() {
    document.documentElement.removeChild(WVJBIframe);
  }, 0);
}

/**
 * 禁用下拉刷新
 * @param {*} data 0 禁用 1 开启  默认开启
 */
const enableRefresh = (data = 0) => {
  try {
    window.WebViewJavascriptBridge.callHandler("enableRefresh", data);
  } catch (e) {
    console.log(e);
  }
};

/**
 * 播放svga动画
 * @param {*} svgaUrl
 */
const playHorseView = (svgaUrl, err) => {
  try {
    window.WebViewJavascriptBridge.callHandler("playHorseView", svgaUrl);
  } catch (e) {
    console.log(e);
    err && err();
  }
};

/**
 *
 * @param {*} icon
 * @param {*} visible 原来的客户端按钮是否可见 1 可以见 0 隐藏
 * @param {*} cb
 */
const handleButtons = (icon, visible = 0, cb) => {
  try {
    var data = {
      copyButtonVisible: visible,
      customIconUrl: icon
    };
    window.WebViewJavascriptBridge.registerHandler("rightIconCb", function() {
      cb && cb();
    });
    console.log("register callback", window.WebViewJavascriptBridge);

    window.WebViewJavascriptBridge.callHandler("handleButtons", data);
  } catch (e) {
    console.log(e);
  }
}; 
/**
 * 下载图片
 */
const handleDownloadImage = (imageUrl, cb) => {
  try {
    window.WebViewJavascriptBridge.registerHandler("downloadImageCb", res => {
      cb && cb(res);
    });
    console.log("register callback", window.WebViewJavascriptBridge);

    window.WebViewJavascriptBridge.callHandler("handleDownloadImage", imageUrl);
  } catch (e) {
    console.log(e);
  }
};
/**
 * 分享
 * @param {*} data
 */

//  {
// type: qq、qzone、wechat、pyq
//   contentType: '' img(imgUrl) text(message) link(title、message、url、imgUrl)
//  }
const handleShare = data => {
  try {
    window.WebViewJavascriptBridge.callHandler("handleShare", data);
  } catch (e) {
    console.log(e);
  }
};
/**
 * 复制到粘贴板
 * @param {*} str
 * @param {*} cb
 */
const handleClipboard = (str, cb) => {
  try {
    window.WebViewJavascriptBridge.callHandler("handleClipboard", str, () => {
      cb && cb();
    });
  } catch (e) {
    console.log(e);
    cb && cb();
  }
};
/**
 * 上传头像
 */
const handleUploadImage = (cb) => {
  try {
    window.WebViewJavascriptBridge.registerHandler("uploadImageCb", res => {
      cb && cb(res);
    });

    window.WebViewJavascriptBridge.callHandler("handleUploadSquareImage", null);
  } catch (e) {
    console.log(e);
  }
};

// handleClipboard
const anroidInit = bridge => {
  try {
    bridge.init(function(message, responseCallback) {
      console.log("JS got a message", message);
      var data = {
        "Javascript Responds": "测试中文!"
      };
      if (responseCallback) {
        console.log("JS responding with", data);
        responseCallback(data);
      }
    });
  } catch (e) {
    console.log(e);
  }
};
let inited = false;

function connectWebViewJavascriptBridge(callback) {
  if (inited) {
    callback();
    return;
  }
  if (isIOS && !inited) {
    setupWebViewJavascriptBridge(function(bridge) {});
    inited = true;
  }
  if (window.WebViewJavascriptBridge) {
    if (!inited) {
      anroidInit(WebViewJavascriptBridge);
      inited = true;
    }
    callback(WebViewJavascriptBridge);
  } else {
    document.addEventListener(
      "WebViewJavascriptBridgeReady",
      function() {
        anroidInit(WebViewJavascriptBridge);
        callback(WebViewJavascriptBridge);
        inited = true;
      },
      false
    );
  }
}

/**
 * 立即执行的 初始化设置
 * @param {} ready
 */
const initClient = connectWebViewJavascriptBridge;

var main = {
  chargeAction,
  goUserPage,
  initClient,
  handleUploadImage,
  handleClipboard,
  handleShare,
  handleDownloadImage,
  handleButtons,
  playHorseView,
  enableRefresh
};

export default main;
