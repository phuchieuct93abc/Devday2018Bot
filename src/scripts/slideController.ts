import * as $ from "jquery"
import * as util from "./util"
const SLIDE_URL = "https://docs.google.com/presentation/d/1XU-_cIa7NIgExt_zEW0WEDtoPC2daiQ0FBI8Pq8fRnA/present?usp=sharing"
enum ACTIONS {
    NEXT, BACK, OPEN, IDLE
}
const ACTION_INTENT = [
    { name: ACTIONS.OPEN, intent: ["open", "slide"] },
    { name: ACTIONS.NEXT, intent: ["next", "slide"] },
    { name: ACTIONS.BACK, intent: ["back", "slide"] }

]

function openSlide() {
    let slideElement = $("#slide");
    slideElement.css("display", "block")
    slideElement.addClass('animated slower bounceInUp');
}


function nextSlide() {
    let iframe: any = document.getElementById('slide');
    let innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    util.triggerEvent(innerDoc, "keydown", 39)
}
function backSlide() {
    let iframe: any = document.getElementById('slide');
    let innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    util.triggerEvent(innerDoc, "keydown", 37)
}


function getAction(speech: string): ACTIONS {
    let action = ACTION_INTENT.filter(intent =>
        intent.intent.every(i => speech.includes(i))
    )
    if (action[0]) {
        return action[0].name;
    }
    return ACTIONS.IDLE;
}

export default function handleSlide(speech) {
    console.log("start handle slide");
    let action: ACTIONS = getAction(speech);
    switch (action) {
        case ACTIONS.OPEN: openSlide(); break;
        case ACTIONS.NEXT: nextSlide(); break;
        case ACTIONS.BACK: backSlide(); break;
        default: break;
    }
}
