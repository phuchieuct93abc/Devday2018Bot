import * as utils from "./util"

function initAnimojiSource() {
    let anis = new Map()
    anis.set("greeting", "greeting.mp4");

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

export let animojis = initAnimojiSource();


