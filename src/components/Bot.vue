<template>
    <div>

        <div class="b-agent-demo" id="b-agent-demo">
            <div class="animoji" id="animoji"  @click="applyAnimation">

                <video src="/dist/default.mp4" autoplay="autoplay" muted loop id="animojiVideo"></video>

            </div>
            <div class="loading">
                <div class="loading-gradient" @click="showMic=!showMic" v-if="showMic == true">
                </div>
            </div>
            <div class="siri-container" id="siri-container" v-show="!showMic"></div>

            <div v-show="false" class="" id="resultWrapper">
                <table class="">
                    <tbody>
                    <tr>
                        <td id="result"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class=""></div>
            <form v-show="false" d="agentDemoForm">
                <input type="text" name="q" id="query" placeholder="Ask something...">
                <!--div class="b-agent-demo_input-microphone material-icons-extended mic-black" id="mic"></div-->
            </form>
            <i v-show="false" class="" id="mic" style=""></i>
        </div>


        <div id="lbdictex_ask_mark" class="hidden" style="position: absolute; top: 0px; left: 0px;"><a
                class="lbdictex_ask_select"
                href="https://console.dialogflow.com/api-client/demo/embedded/616d1a7f-fb60-439c-87fb-012789a05eff#"></a>
        </div>


    </div>


</template>

<script>

    import {SiriWave} from "../scripts/siriwave";
    import {VoiceListener, EventBus} from "../main";

    export default {
        name: "Bot",
        data() {
            return {
               /*  animojiStyle: {
                    width: "0px"
                }, */
                showMic: true
            }
        },
        mounted() {

          /*   var interval = setInterval(() => {
                var animojiHeight = document.getElementById("animoji").offsetHeight;

                if (animojiHeight != 0) {
                    this.animojiStyle.width = animojiHeight + "px !important";
                    clearInterval(interval);
                }
                ;
            }, 500); */
            EventBus.$on('anchorMode', () => {
                let animoji = $("#animoji");
                let top = $("#animoji").offset().top;
                let right = $(window).width() - $("#animoji").offset().left - $("#animoji").outerWidth()

                $("#animoji").css({top:top,right:right});
                setTimeout(()=>{

                    $("#animoji").addClass("window")
                },500)
            });

            var siriWave = new SiriWave({
                style: 'ios9',
                container: document.getElementById('siri-container'),
                autostart: true,
                speed: 0.1,
                amplitude: 0.2
            });

        },

        methods: {
            applyAnimation: () => {
                document.getElementById("animoji").classList.add("slide-out");
            }
        },
        created () {
            VoiceListener.$on('onVoiceStart', () => {
                this.showMic = false;
            });

            VoiceListener.$on('onVoiceEnd', () => {
                this.showMic = true ;
            })
        }


    }
</script>

<style scoped lang="scss">

    .b-agent-demo {
        display: flex;

        //justify-content: center;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #2b2b2b;

        .animoji {
            height: 300px;
            width:300px;
            right:400px;
            /* border: #2a2c31; */
            overflow: hidden;
            border-radius: 50%;
            /* box-shadow: 0 10px 150px 80px rgba(0, 0, 0, 0.5); */
            /* margin-bottom: 100px; */
            position: fixed;
            z-index: 99;
            transition: all 1s linear;
            
            &.window{
                right:10px !important;
                top:10px !important;
                width: 100px;
                height: 100px;
            }

        }
        video {
            height: 100%;
            width: 100%;
            object-fit: cover;
            z-index: -1;
        }
        .siri-container {

            width: 400px;
            height: 60px;
            // background: #000;
            //border: 1px solid rgba(255, 255, 255, .1);
            // margin: 20px;
            // margin: 0 auto;
        }

        .slide-out {
            -moz-animation: slide-out-blurred-tr 1.5s;
            -webkit-animation: slide-out-blurred-tr 1.5s;
            -o-animation: slide-out-blurred-tr 1.5s;
        }

        @-webkit-keyframes slide-out-blurred-tr {
            0% {
                -webkit-transform: translate(0, 0) skew(0deg, 0deg);
                transform: translate(0, 0) skew(0deg, 0deg);
                -webkit-transform-origin: 50% 50%;
                transform-origin: 50% 50%;
                -webkit-filter: blur(0);
                filter: blur(0);
                opacity: 1
            }
            100% {
                -webkit-transform: translate(1000px, -1000px) skew(-80deg, -10deg);
                transform: translate(1000px, -1000px) skew(-80deg, -10deg);
                -webkit-transform-origin: 0 0;
                transform-origin: 0 0;
                -webkit-filter: blur(40px);
                filter: blur(40px);
                opacity: 0
            }
        }
        @keyframes slide-out-blurred-tr {
            0% {
                -webkit-transform: translate(0, 0) skew(0deg, 0deg);
                transform: translate(0, 0) skew(0deg, 0deg);
                -webkit-transform-origin: 50% 50%;
                transform-origin: 50% 50%;
                -webkit-filter: blur(0);
                filter: blur(0);
                opacity: 1
            }
            100% {
                -webkit-transform: translate(1000px, -1000px) skew(-80deg, -10deg);
                transform: translate(1000px, -1000px) skew(-80deg, -10deg);
                -webkit-transform-origin: 0 0;
                transform-origin: 0 0;
                -webkit-filter: blur(40px);
                filter: blur(40px);
                opacity: 0
            }
        }

        .loading {
           // margin-top: 100px;
            background-image: url("../images/siri.png");
            -webkit-background-size: cover;
            background-size: cover;
            .loading-gradient {
                width: 60px;
                height: 60px;
                border: 1px solid #ffffff;
                border-radius: 100%;
                box-shadow: 0 0 0 2px white inset,
                0 -5px 20px 5px rgba(255, 0, 0, 0.5) inset,
                0 0 20px 5px rgba(0, 255, 0, 0.5) inset,
                0 5px 20px 5px rgba(0, 0, 255, 0.5) inset,
                0 5px 20px 5px rgba(255, 0, 0, 0.5),
                0 0 20px 5px rgba(0, 255, 0, 0.5),
                0 -5px 20px 5px rgba(0, 0, 255, 0.5);

                -webkit-animation: gradient 1s linear infinite;

                @-webkit-keyframes gradient {
                    0% {
                        -webkit-transform: rotate(0deg);
                    }
                    100% {
                        -webkit-transform: rotate(360deg);
                    }
                }
                @keyframes gradient {
                    0% {
                        -webkit-transform: rotate(0deg);
                    }
                    100% {
                        -webkit-transform: rotate(360deg);
                    }
                }
            }
        }

    }


</style>
