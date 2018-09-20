//open /Applications/Google\ Chrome.app --args --user-data-dir="/var/tmp/Chrome dev session" --disable-web-security

import * as $ from "jquery";
const SLIDE_URL = "https://docs.google.com/presentation/d/1XU-_cIa7NIgExt_zEW0WEDtoPC2daiQ0FBI8Pq8fRnA/present?usp=sharing"
enum ACTIONS {
    NEXT, BACK, OPEN
}
const ACTION_INTENT = [
    { name: ACTIONS.OPEN, intent: ["open", "slide"] },
    { name: ACTIONS.NEXT, intent: ["next", "slide"] }

]

function openSlide() {
    let slideElement = $("#slide");
    slideElement.css("display", "block")
    slideElement.addClass('animated slower bounceInUp');
}
function nextSlide(){
    var iframe:any = document.getElementById('slide');
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    console.log($(innerDoc).find(".punch-viewer-nav-fixed .goog-flat-button").eq(3).trigger("mousedown"))
}


function getAction(speech: string): ACTIONS {
    let action = ACTION_INTENT.filter(intent =>
        intent.intent.every(i => speech.includes(i))
    )
    return action[0].name;
}

function handleSlide(result) {
    let action: ACTIONS = getAction(result.result.fulfillment.speech);
    console.log(action)
    switch (action) {
        case ACTIONS.OPEN: openSlide(); break;
        case ACTIONS.NEXT: nextSlide(); break;
        default: break;
    }


}

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
        handleSlide(result);
    })
}