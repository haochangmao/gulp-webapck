
let docEl = document.documentElement,
resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//开发文档页面 ios safari下bug
address = location.href.indexOf('docs') > -1,
recalc = function() {
    let clientWidth = docEl.clientWidth > 750 ? 750 : docEl.clientWidth;
    if (!clientWidth) {
      return;
    }
    
    //这里的20是指在640是px的设计稿中字的基本大小
    docEl.style.fontSize = 23.4376 * (clientWidth / 750) + 'px';
};

document.addEventListener('DOMContentLoaded', recalc, false);
!address && window.addEventListener(resizeEvt, recalc, false);

//解决IOS :active无效
document.body.addEventListener('touchstart', function() {});