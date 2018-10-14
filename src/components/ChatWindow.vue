<template>
    <div id="chatwindow-container">
        <div id="chatwindow-wrapper" class="chatwindow-wrapper">

            <video src="/dist/default.mp4" autoplay="autoplay" muted loop id="animojiVideoWindow"></video>
        </div>


    </div>

</template>

<script>
    export default {
        name: "ChatWindow"
    }
</script>

<style scoped lang="scss">

    .chatwindow-wrapper {
        //display: block;

        height: 15%;
        width: 250px;
        position: fixed;
        top: 0;
        right: 0;
        box-shadow: 0px 2px 11px #323335;
        z-index: 1000000000;
        background-color: white;

        video {
            height: 100%;
            width: 100%;
        }
    }

</style>
