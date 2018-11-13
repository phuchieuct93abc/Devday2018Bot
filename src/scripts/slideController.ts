import * as $ from "jquery"
import * as util from "./util"
import * as animojiController from './animojiController.js'
import * as voice from "./responsivevoice"
import * as voiceHandler from "./voiceHandler"

const ENDING_SLIDE = '38'
enum ACTIONS {
    NEXT, BACK, OPEN, IDLE, SHOW_RESULT, CLOSE_RESULT
}
const ACTION_INTENT = [
    { name: ACTIONS.OPEN, intent: ["openSlide"] },
    { name: ACTIONS.NEXT, intent: ["nextSlide"] },
    { name: ACTIONS.BACK, intent: ["backSlide"] },
    { name: ACTIONS.SHOW_RESULT, intent: ["searchResult"] },
    { name: ACTIONS.CLOSE_RESULT, intent: ["closeAIResult"] }

]

function openSlide() {
    let slideElement = $("#slide");
    slideElement.css("display", "block")
    slideElement.addClass('animated slower bounceInUp');
    $("#slide").focus();
    animojiController.notify('openSlide');
    slideController.registerSlideChange();
}

function nextSlide() {
    let iframe: any = document.getElementById('slide');
    let innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    util.triggerEvent(innerDoc, "keydown", 39);
    animojiController.notify('closeSearchResult');
}
function backSlide() {
    let iframe: any = document.getElementById('slide');
    let innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    util.triggerEvent(innerDoc, "keydown", 37)
}
function showResult() {
    animojiController.notify("showSearchResult");
}

function closeResult() {
    animojiController.notify("closeSearchResult");
}


function getAction(id: string): ACTIONS {
    let action = ACTION_INTENT.filter(intent =>
        intent.intent.every(i => i.includes(id))
    )
    if (action[0]) {
        return action[0].name;
    }
    return ACTIONS.IDLE;
}


export function navigateSlide(speech) {
    let action: ACTIONS = getAction(speech);
    switch (action) {
        case ACTIONS.OPEN: openSlide(); break;
        case ACTIONS.NEXT: nextSlide(); break;
        case ACTIONS.BACK: backSlide(); break;
        case ACTIONS.SHOW_RESULT: showResult(); break;
        case ACTIONS.CLOSE_RESULT: closeResult(); break;
        default: break;
    }
}

class SlideController {
    registerSlideChange() {
        let iframe: any = document.getElementById('slide');
        let innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        $(innerDoc).on("keydown", () => {
            var slideNumber = $(innerDoc).find("[aria-posinset]").attr("aria-posinset")

            if (slideNumber == ENDING_SLIDE) {
                animojiController.notify("callAlexWhilePresent");
                setTimeout(() => {
                    voice.responsiveVoice.speak(voiceHandler.MANUAL_VOICE.ENDING_SLIDE, "US English Male", { rate: 0.6 });
                }, 1000);
            }
        })
    }

}

export var slideController = new SlideController();;



