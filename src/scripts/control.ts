//open /Applications/Google\ Chrome.app --args --user-data-dir="/var/tmp/Chrome dev session" --disable-web-security --disable-site-isolation-trials

import * as $ from "jquery";
import slideController from "./slideController"
import * as animojiController from "./animojiController"
import chatWindowController from "./chatWindowController"


export function startRecord() {
    $("#mic").click()
}


export function getResult(result, id ) {

    var parameters = {
        onstart: voiceStartCallback,
        onend: function () {
            voiceEndCallback(result, id);
        }
    }

    return parameters;
}



function voiceStartCallback() {
    console.log("Voice started");
}

function voiceEndCallback(result, id) {
    slideController(result);
    animojiController.resetDefaultAnimoji();
    chatWindowController(id);
    startRecord();
}
