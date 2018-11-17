<template>
    <div id="backup" class="container">
       <ul class="list-group">
            <li v-for="intent in itents" class="list-group-item">
                {{ intent }} 
                <button v-on:click="select(intent)" type="button" class="btn btn-link">Send</button>
            </li>
        </ul>
    </div>
</template>

<script>
    import * as $ from "jquery"
    export default {
    name: "backup",
    data() {
        return {
            itents:[
                "good morning alex",
                "alex can you introduce yourself",
                "What are your feeling",
                "Topic",
                "Open slide",
                "What is AI",
                "Call you later",
                "Hi alex",
                "Good bye"
            ]
        }
    },

    methods: {
        select: content =>{
            $.post("//"+window.location.hostname,{content:content});
        }
    }
    
};
</script>
