<template>
    <div id="app">
        <calling :is-show-conversation="isShowConversation"></calling>
        <bot v-show="isShowConversation " :is-show-animoji="isShowAnimoji"></bot>
        <iframe style="display:none" id="slide"
                src="https://docs.google.com/presentation/d/e/2PACX-1vTYiBVS8T_nLVbjwRG7qHtvEqlqeh_icZwXVD3aGtID94Lmv-CQflpvshYdGJkmkst51EaTA7IR-kvD/embed?start=false&loop=false&delayms=3000"
                frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true"
                webkitallowfullscreen="true">



        </iframe>
        <transition name="slide-fade">
            <div v-if = "isShowAiSearchResult" id="ai-search-result" class="ai-search-result" >
                <img src="./images/ai-search.png"/>

            </div>
        </transition>


    </div>
</template>

<script>
    import Bot from "./components/Bot";
    import Calling from "./components/Calling";
    import {EventBus} from "./main"
    import ChatWindow from "./components/ChatWindow";
    import * as voiceHandler from "./scripts/voiceHandler"
    import * as voice from "./scripts/responsivevoice"
    import * as $ from "jquery"
    import {voiceData} from "./scripts/agent";
    import io from 'socket.io-client';
import voiceTrigger from './scripts/voiceTrigger';
    import * as animojiController from "./scripts/animojiController";

    export default {
        name: 'app',
        components: {ChatWindow, Calling, Bot},

        data() {
            return {
                isShowConversation: false,
                isShowAnimoji: true,
                isShowAiSearchResult: false

            }
        },

        methods: {},

        created() {
            EventBus.$on('stopCallingAudio', () => {
                console.log("end calling");
                this.isShowConversation = true;
                document.getElementById("mic").click();
            });

            EventBus.$on('openSlide', () => {

                let animoji = $("#animoji");
                let top = $("#animoji").offset().top;
                let right = $(window).width() - $("#animoji").offset().left - $("#animoji").outerWidth()

                $("#animoji").css({top:top,right:right});
                setTimeout(()=>{

                    $("#animoji").addClass("window")
                },100)



            });

            EventBus.$on('callLater', () => {
                voiceData.isIdle = true;
                this.isShowAnimoji = false;

            });

            EventBus.$on('callAlexWhilePresent', () => {
                this.isShowAnimoji = true;

            });


            EventBus.$on('showSearchResult', () => {
                this.isShowAiSearchResult = true;
                this.isShowAnimoji = true;
                voiceData.isIdle = true;
                voice.responsiveVoice.speak(voiceHandler.MANUAL_VOICE.AI_DEF, "US English Male");
            });

            EventBus.$on('closeSearchResult', () => {
                this.isShowAiSearchResult = false;
                this.isShowAnimoji = false;
                voiceData.isIdle = true;
            })

            EventBus.$on('endPresentation', () => {
                let slideElement = $("#slide");
                slideElement.css("display", "none");
                this.isShowAnimoji = true;
                $("#animoji").removeClass("window");
                voiceData.isIdle = true;
                animojiController.getAnimoji("animojiVideo",'dancing', true);
            })



            const socket = io('http://localhost');

            socket.on('voice', function(data){
                console.log(data);
               voiceTrigger.trigger(data.content);
                voiceData.isIdle = true;
            });


        }
    }
</script>

<style lang="scss">

    iframe {
        height: 100%;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 1s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        transition: .6s;
        opacity: 0;
    }


    #app {
        display: flex;
        height: 100vh;
        justify-content: center;
        flex-direction: column;
    }
    .ai-search-result {
        -webkit-background-size: cover;
        align-self: center;
        background-size: cover;
        width: 1400px;
        height: 400px;
        z-index: 9999999999999999;
        padding: 40px;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 15px;
        img {
            height: 100%;
            width: 100%;
        }
    }

    .slide-fade-enter-active {
        transition: all .8s ease;
    }
    .slide-fade-leave-active {
        transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }

</style>
