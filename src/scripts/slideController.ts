import * as $ from "jquery"
import * as util from "./util"
enum ACTIONS {
    NEXT, BACK, OPEN, IDLE
}
const ACTION_INTENT = [
    { name: ACTIONS.OPEN, intent: ["open", "slide"] },
    { name: ACTIONS.NEXT, intent: ["next", "slide"] },
    { name: ACTIONS.BACK, intent: ["back", "slide"] }

]

export function openSlide() {
    let slideElement = $("#slide");
    slideElement.css("display", "block")
    slideElement.addClass('animated slower bounceInUp');
}


export function nextSlide() {
    let iframe: any = document.getElementById('slide');
    let innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    util.triggerEvent(innerDoc, "keydown", 39)
}
export function backSlide() {
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

export function controlSlide(speech) {
    let action: ACTIONS = getAction(speech);
    switch (action) {
        case ACTIONS.OPEN: openSlide(); break;
        case ACTIONS.NEXT: nextSlide(); break;
        case ACTIONS.BACK: backSlide(); break;
        default: break;
    }
}
//Register onChange slide
export let onOpenSlideWithBot = new Promise((resolve) => {
    $(function () {
        setTimeout(() => {
            let iframe: any = document.getElementById('slide');
            let innerDoc = iframe.contentDocument || iframe.contentWindow.document;
            $(innerDoc).on("keydown click", (event) => {
                if ($(innerDoc).find("[aria-posinset]").attr("aria-posinset") === '3') {
                    resolve();
                }
            })
        }, 2000)
    })
})

