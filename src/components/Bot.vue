<template>
    <div>

        <div class="b-agent-demo">

            <div class="animoji" id="animoji" :style="animojiStyle">

                <video src ="/dist/default.mp4" autoplay="autoplay" muted loop id="animojiVideo"></video>
            </div>

            <div class="b-agent-demo_result" id="resultWrapper">
                <table class="b-agent-demo_result-table">
                    <tbody>
                    <tr>
                        <td id="result"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="clearfix"></div>
            <div class="b-agent-demo_input">
                <form id="agentDemoForm">
                    <input type="text" name="q" id="query" placeholder="Ask something...">
                    <i class="b-agent-demo_input-microphone material-icons-extended" id="mic" style="display: block;"
                       onload="$('#mic').click()">mic</i>

                    <!--div class="b-agent-demo_input-microphone material-icons-extended mic-black" id="mic"></div-->
                </form>
            </div>
        </div>


        <div id="lbdictex_ask_mark" class="hidden" style="position: absolute; top: 0px; left: 0px;"><a
                class="lbdictex_ask_select"
                href="https://console.dialogflow.com/api-client/demo/embedded/616d1a7f-fb60-439c-87fb-012789a05eff#"></a>
        </div>

    </div>


</template>

<script>


    export default {
        name: "Bot",
        data() {
            return {
                animojiStyle :{
                    width : "0px"
                }
            }
        },
        mounted() {
           var a = document.getElementById("animoji");
           console.log(a.offsetHeight);
            this.animojiStyle.width = document.getElementById("animoji").offsetHeight + "px !important";

        },



    }
</script>

<style scoped lang="scss">

    .b-agent-demo {
        display: flex;

        //justify-content: center;
        flex-direction: column;

        .b-agent-demo_result {

            border: #00a8c6 solid;

            height: 63%;
        }

        .animoji {

            align-self: center;
            height: 30%;
        }
        video {
            height: 100%;
            width: 100%;
            object-fit: cover;
            z-index: -1;
         }

    }





</style>
