//open /Applications/Google\ Chrome.app --args --user-data-dir="/var/tmp/Chrome dev session" --disable-web-security --disable-site-isolation-trials

import * as $ from "jquery";
import {handleSlide} from "./slideController"
import * as animojiController from "./animojiController"
import chatWindowController from "./chatWindowController"


export function startRecord() {
    $("#mic").click()
}


export function getResult(id ) {

    var parameters = {
        onstart: voiceStartCallback,
        onend: function () {
            voiceEndCallback(id);
        }
    }

    return parameters;
}



function voiceStartCallback() {
    console.log("Voice started");
}

function voiceEndCallback(id) {
    handleSlide(id);
    animojiController.resetDefaultAnimoji();
    chatWindowController(id);
    startRecord();
}
