<template>
    <div class="calling-wrapper">
        <div class="phone" v-if="!isCalling" @click="onCall">
            <!--<img src="../images/callBtn.png" @click="onCall"/>-->
            <!--<div>-->
            <!--<h1>Call Alex</h1>-->
            <!--</div>-->
            <i class="fas fa-phone phone-icon"></i>
        </div>
        <!--isCalling && !isShowConversation-->

        <div class="calling-screen" v-if="isCalling && !isShowConversation">
            <img src="../images/callingBot.png"/>
            <audio loop="loop" autoplay="autoplay">
                <source src=<%=require("./images/calling.mp3")%>
                type="audio/mpeg" />
            </audio>
        </div>
    </div>

</template>

<script>
    import {EventBus} from "../main"

    export default {
        name: "Calling",
        props: {
            isShowConversation: false
        },
        data() {
            return {
                isCalling: false,
                callingAudio: new Audio('/dist/calling.mp3')
            }

        },

        methods: {
            onCall() {
                this.isCalling = !this.isCalling;

                setTimeout(() => {
                    this.stopAudio();
                }, 5000)

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

    .calling-wrapper {
     //   width: 100%;
    }
    .phone {
        position: fixed;
        bottom: 30px;
        right: 45px;
        font-size: 38px;
        border: black;
        border-radius: 50%;
        height: 65px;
        width: 65px;
        background: #105592;
        display: flex;
        color: white;
        box-shadow: 2px 3px 7px 0px rgba(0, 0, 0, 0.5);
        align-items: center;
        justify-content: center;

        img {
            cursor: pointer;
        }
        .phone-icon:hover {
            -webkit-animation: shake-lr 1s infinite;
            -o-animation: shake-lr 1s infinite;
            animation: shake-lr 1s infinite;
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


    @-webkit-keyframes shake-lr {
        0%, 100% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
            -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%
        }
        10% {
            -webkit-transform: rotate(8deg);
            transform: rotate(8deg)
        }
        20%, 40%, 60% {
            -webkit-transform: rotate(-10deg);
            transform: rotate(-10deg)
        }
        30%, 50%, 70% {
            -webkit-transform: rotate(10deg);
            transform: rotate(10deg)
        }
        80% {
            -webkit-transform: rotate(-8deg);
            transform: rotate(-8deg)
        }
        90% {
            -webkit-transform: rotate(8deg);
            transform: rotate(8deg)
        }
    }

    @keyframes shake-lr {
        0%, 100% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
            -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%
        }
        10% {
            -webkit-transform: rotate(8deg);
            transform: rotate(8deg)
        }
        20%, 40%, 60% {
            -webkit-transform: rotate(-10deg);
            transform: rotate(-10deg)
        }
        30%, 50%, 70% {
            -webkit-transform: rotate(10deg);
            transform: rotate(10deg)
        }
        80% {
            -webkit-transform: rotate(-8deg);
            transform: rotate(-8deg)
        }
        90% {
            -webkit-transform: rotate(8deg);
            transform: rotate(8deg)
        }
    }


</style>
