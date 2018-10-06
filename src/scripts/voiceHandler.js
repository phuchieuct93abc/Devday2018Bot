export function initVoiceRecognition (voiceData, agent) {

    let speechRecognition = new webkitSpeechRecognition();
    let domHelper = agent.domHelper;
    speechRecognition.onstart = function () {
        console.log("---------- on sound starts ");
        voiceData.isVoiceStandby = true;
        agent.isRecognizing = !0;
        domHelper.handleStartRecognition()
    }
    ;
    speechRecognition.onerror = function (e) {
        console.error(e);
    }
    ;
    speechRecognition.onend = function () {

        console.log("---------- on end ");
        domHelper.handleStopRecognition();
        agent.isRecognizing = !1;
        if (voiceData.isVoiceStandby) {
            console.log("----------- Idle !!!!");
            voiceData.isIdle = true;
            speechRecognition.start();

        }
        voiceData.isVoiceStandby = true;

    };

    speechRecognition.onsoundend = function (b) {

        console.log("---------- on sound ends " + b.results);
    };

    speechRecognition.onsoundstart = function () {
        console.log("---------- on sound start ");
    }

    speechRecognition.onresult = function (event) {

        voiceData.isVoiceStandby = false;
        for (var c = "", e = event.resultIndex; e < event.results.length; ++e) {
            event.results[e].isFinal && (c += event.results[e][0].transcript);
        }
        console.log("---------- on result: " + c);

        voiceData.content = c;
        if(voiceData.isIdle && !c.toLowerCase().includes("hey alex")) {
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
