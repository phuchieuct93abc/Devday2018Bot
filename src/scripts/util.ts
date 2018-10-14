export function triggerEvent(el, type, keyCode) {
    var e: any = document.createEvent('HTMLEvents');
    e.keyCode = keyCode;
    e.initEvent(type, false, true);
    el.dispatchEvent(e);

}

export function insert(main_string, ins_string, pos) {
    if(typeof(pos) == "undefined") {
        pos = 0;
    }
    if(typeof(ins_string) == "undefined") {
        ins_string = '';
    }
    return main_string.slice(0, pos) + ins_string + main_string.slice(pos);
}



