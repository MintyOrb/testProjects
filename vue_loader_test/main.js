// main.js
var Vue = require('vue')
// require a *.vue component
var App = require('./components/App.vue')

// mount a root Vue instance
new Vue({
  el: '#vue',
  data: {
    test: "hello worlds"
  },
  components: {
    // include the required component
    // in the options
    app: App
  }
})