//open /Applications/Google\ Chrome.app --args --user-data-dir="/var/tmp/Chrome dev session" --disable-web-security --disable-site-isolation-trials

import * as $ from "jquery";
import slideController from "./slideController"
import * as animojiController from "./animojiController"


export function startRecord() {
    $("#mic").click()
}


export function getResult(result) {

    var parameters = {
        onstart: voiceStartCallback,
        onend: function () {
            voiceEndCallback(result);
        }
    }

    return parameters;
}



function voiceStartCallback() {
    console.log("Voice started");
}

function voiceEndCallback(result) {
    slideController(result);
    animojiController.resetDefaultAnimoji();
    startRecord();
}
