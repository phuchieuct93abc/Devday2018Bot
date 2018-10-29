//open /Applications/Google\ Chrome.app --args --user-data-dir="/var/tmp/Chrome dev session" --disable-web-security --disable-site-isolation-trials

import * as $ from "jquery";
import * as slideControler from "./slideController"
import * as animojiController from "./animojiController"
import chatWindowController from "./chatWindowController"


export function startRecord() {
    $("#mic").click()
}


export function getResult(result, id) {

    var parameters = {
        onstart: () => {
            voiceStartCallback(result, id);
        },
        onend: () => {
            voiceEndCallback(result, id);
        },

    }

    return parameters;
}


const startAction = {

    "greeting": () => {
        slideControler.nextSlide();
        animojiController.notify('openSlide')
    }

}

function voiceStartCallback(result, id) {
    startAction[id] && startAction[id]();
}



function voiceEndCallback(result, id) {
    slideControler.controlSlide(result);
    animojiController.resetDefaultAnimoji();
    chatWindowController(id);
    startRecord();
}

