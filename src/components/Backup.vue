<template>
    <div id="backup" class="container">
        <input v-model="appendText"/>
        <button v-on:click="append" type="button" class="btn btn-link">add</button>
        <ul class="list-group">
            <li v-for="intent in intents" class="list-group-item">
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
                intents: [
                    "good morning alex",
                    "alex can you introduce yourself",
                    "What are your feeling",
                    "Topic",
                    "Open slide",
                    "What is AI",
                    "Call you later",
                    "Good bye",
                    "Hi alex",
                    "Close timer",
                    "Show timer",
                    "Dancing"
                ],
                appendText: ''
            }
        },

        methods: {
            select: content => {
                $.post("//" + window.location.hostname, {content: content});
            },

            append: function(){
                this.intents.push(this.appendText);
            }
        }

    };
</script>
