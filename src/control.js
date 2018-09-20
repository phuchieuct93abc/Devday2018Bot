import $ from "jquery"
const SLIDE_URL = "https://docs.google.com/presentation/d/1XU-_cIa7NIgExt_zEW0WEDtoPC2daiQ0FBI8Pq8fRnA/present?usp=sharing"


function openSlide() {
    let slideElement = $("#slide");
    slideElement.css("display", "block")
    slideElement.addClass('animated slower bounceInUp');
}




function handleSlide(result) {
    let speech = result.result.fulfillment.speech
    let isOpenSlide = speech.indexOf("slide") >= 0 && speech.indexOf("opening") >= 0
    if (isOpenSlide) {
        openSlide()
    }


}

function playAudio(result) {
    return new Promise((resolve, reject) => {
        let audioElement = document.getElementById('audio-' + result.id)
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