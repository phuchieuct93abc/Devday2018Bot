import { SiriWave } from "./siriwave";
import { VoiceListener } from "../main";

export let MANUAL_VOICE = {
    AI_DEF: "Artificial intelligence (AI)  sometimes called machine intelligence, " +
        "is intelligence demonstrated by machines, " +
        "in contrast to the natural intelligence displayed by humans and other animals. ",
    ENDING_SLIDE: "Are you ready for AI?"

}

export function initVoiceRecognition(voiceData, agent) {

    let speechRecognition = new webkitSpeechRecognition();
    let domHelper = agent.domHelper;
    speechRecognition.onstart = function () {
        console.log("---------- on sound starts ");
        voiceData.isVoiceStandby = true;
        agent.isRecognizing = !0;
        domHelper.handleStartRecognition();

    }
        ;
    speechRecognition.onerror = function (e) {
        //console.error(e);
    }
        ;
    speechRecognition.onend = function () {

        console.log("---------- on end ");
        domHelper.handleStopRecognition();
        VoiceListener.$emit('onVoiceEnd');
        agent.isRecognizing = !1;
        if (voiceData.isVoiceStandby) {
            if (voiceData.isIdle) {
                console.log("----------- Idle !!!!");
            }
            // console.log("----------- Idle !!!!");
            // voiceData.isIdle = true;
            speechRecognition.start();

        }
        voiceData.isVoiceStandby = true;

    };

    speechRecognition.onsoundend = function (b) {

        console.log("---------- on sound ends " + b.results);
    };

    speechRecognition.onsoundstart = function () {
        console.log("---------- on sound start ");
        VoiceListener.$emit('onVoiceStart');
    }

    speechRecognition.onresult = function (event) {

        voiceData.isVoiceStandby = false;
        for (var c = "", e = event.resultIndex; e < event.results.length; ++e) {
            event.results[e].isFinal && (c += event.results[e][0].transcript);
        }
        console.log("---------- on result: " + c);

        voiceData.content = c;
        if (voiceData.isIdle && !c.toLowerCase().includes("alex")) {
            voiceData.isVoiceStandby = true;
            return;
        }
        voiceData.isIdle = false;
        domHelper.setInputValue(c);
        agent.handleInput()
    }
        ;
    speechRecognition.lang = window.AGENT_LANGUAGE || "en-US";
    return speechRecognition;

}
