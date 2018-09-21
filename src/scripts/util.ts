export function triggerEvent(el, type, keyCode) {
    var e: any = document.createEvent('HTMLEvents');
    e.keyCode = keyCode;
    e.initEvent(type, false, true);
    el.dispatchEvent(e);

}