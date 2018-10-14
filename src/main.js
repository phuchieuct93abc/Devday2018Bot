import "./styles/styles.css"
import "./styles/main.css"
import "animate.css"
import "./scripts/responsivevoice"
import "./scripts/agent"
import * as $ from "jquery"
import * as control from "./scripts/control"
import Vue from 'vue'
import App from './App.vue'





let req = require.context('../dist/', true, /\.mp4$/);
req.keys().forEach(function(key){
  req(key);
});

export const EventBus = new Vue({});


new Vue({
  el: '#app',
  render: h => h(App)
})
