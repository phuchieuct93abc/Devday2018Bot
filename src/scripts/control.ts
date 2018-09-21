//open /Applications/Google\ Chrome.app --args --user-data-dir="/var/tmp/Chrome dev session" --disable-web-security --disable-site-isolation-trials

import * as $ from "jquery";
import slideController from "./slideController"
function playAudio(result) {
    return new Promise((resolve, reject) => {
        let audioElement: any = document.getElementById('audio-' + result.id)
        audioElement.addEventListener("ended", function () {
            startRecord();
            resolve(result)
        })
        audioElement.play();

    })
}

export function startRecord() {
    $("#mic").click()
}
export function getResult(result) {
    playAudio(result).then(result => {
        slideController(result);
    })
}