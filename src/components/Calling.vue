<template>
    <div class="calling-wrapper" >
        <div class = "phone" v-if="!isCalling">
            <img src="../images/callBtn.png" @click="onCall"/>
            <div>
                <h1>Call Alex</h1>
            </div>
        </div>

        <div class="calling-screen" v-if="isCalling && !isShowConversation">
            <img src="../images/callingBot.png"/>
            <audio loop="loop" autoplay="autoplay">
                <source src=<%=require("./images/calling.mp3")%> type="audio/mpeg" />
            </audio>
        </div>
    </div>

</template>

<script>
    import {EventBus} from "../main"
    export default {
        name: "Calling",
        props : {
            isShowConversation : false
        },
        data() {
            return {
                isCalling : false,
                callingAudio : new Audio('/dist/calling.mp3')
            }

        },

        methods: {
            onCall ()  {
                this.isCalling = !this.isCalling;

                setTimeout(()=> {
                   this.stopAudio();
                },5000)

                this.callingAudio.play();
            },

            stopAudio() {
                this.callingAudio.pause();
                EventBus.$emit('stopCallingAudio');
            }
        }
    }
</script>

<style scoped lang="scss">

    .phone {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        img {
            cursor: pointer;
        }
    }

    .calling-screen {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: #2c2d35 !important;
        img {
            height: 100vh;
            width: auto;
        }

    }




</style>
