<template>
    <div>

        <div class="b-agent-demo" id="b-agent-demo">
            <div class="animoji" id="animoji"  @click="applyAnimation" v-show="isShowAnimoji">

                <video src="/dist/default.mp4" autoplay="autoplay" muted loop id="animojiVideo"></video>

            </div>


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


    import {VoiceListener} from "../main";


    export default {
        props :[
            'isShowAnimoji'

        ],
        name: "Bot",
        data() {
            return {
                showMic: true
            }
        },
        mounted() {


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
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #2b2b2b;


        .animoji {
            height: 300px;
            width: 300px;
            overflow: hidden;
            border-radius: 50%;
            margin-bottom: 50px;
            position: fixed;
            z-index: 99;
            transition: all 1s linear;

            &.window{
                right:10px !important;
                top:10px !important;
                width: 100px;
                height: 100px;;
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
            background-image: url("../images/siri.png");
            -webkit-background-size: cover;
            background-size: cover;
            margin-top: 450px;
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
