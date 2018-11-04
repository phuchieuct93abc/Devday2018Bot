<template>
    <div id="app">
        <calling :is-show-conversation="isShowConversation"></calling>
        <bot v-show="isShowConversation "></bot>
        <iframe style="display:none" id="slide"
                src="https://docs.google.com/presentation/d/e/2PACX-1vTYiBVS8T_nLVbjwRG7qHtvEqlqeh_icZwXVD3aGtID94Lmv-CQflpvshYdGJkmkst51EaTA7IR-kvD/embed?start=false&loop=false&delayms=3000"
                frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true"
                webkitallowfullscreen="true"></iframe>
    </div>
</template>

<script>
    import Bot from "./components/Bot";
    import Calling from "./components/Calling";
    import {EventBus} from "./main"
    import ChatWindow from "./components/ChatWindow";
    import * as $ from 'jquery'

    export default {
        name: 'app',
        components: {ChatWindow, Calling, Bot},

        data() {
            return {
                isShowConversation: false,
                isShowVideoWindow: false
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
                },500)



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


</style>
