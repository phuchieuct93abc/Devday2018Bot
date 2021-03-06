import * as utils from "./util"
import {EventBus} from "../main";

function initAnimojiSource() {
    let anis = new Map()
    anis.set("greeting", "/dist/talking.mp4");
    anis.set("getName", "/dist/talking.mp4");
    anis.set("default", "/dist/default.mp4");
    anis.set("talking", "/dist/talking.mp4");
    anis.set("dancing", "/dist/dancing.mp4");
    anis.set("feeling", "/dist/talking.mp4");
    return anis;
}

export function parseResponse(speech) {

    var response = null;

    try {
        var jsonStr = utils.insert(speech, "{", 0);
        jsonStr = utils.insert(jsonStr, "}", jsonStr.length);

        response = JSON.parse(jsonStr);
        if (response.id && response.text) {

            return response;
        }

    } catch (ex) {
        return speech;
    }

}

export function resetDefaultAnimoji() {
    setTimeout(function() {
        getAnimoji("animojiVideo","default", true);
    }, 2000);

}

export function getAnimoji(elementId, animojiId, loop) {
    var animojiVideo = document.getElementById(elementId);
    var src = animojis.get(animojiId);
    if(src) {

        animojiVideo.src = animojis.get(animojiId);
    } else {
        animojiVideo.src = animojis.get("talking");
    }
    animojiVideo.loop = loop;
}

export let animojis = initAnimojiSource();

export function notify(eventId) {
    EventBus.$emit(eventId);
}


