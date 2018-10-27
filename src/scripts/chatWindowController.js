import {EventBus} from "../main";


const WAKE_UP_IDS = [
    "callAlexWhilePresent", "callAlexWhilePresent1", "callAlexWhilePresent2"
]
const CALL_ALEX_LATER_IDS = [
    "callLater", "callLater1", "callLater2"
]


export default function handleChatWindow(voiceId) {


    if (CALL_ALEX_LATER_IDS.includes(voiceId)) {
        EventBus.$emit("callLater");
    }

    if (WAKE_UP_IDS.includes(voiceId)) {
        EventBus.$emit("callAlexWhilePresent");
    }

}
