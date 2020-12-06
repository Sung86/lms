import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import vuetify from './plugins/vuetify'
import MarqueeText from 'vue-marquee-text-component'
import * as VueGoogleMaps from 'vue2-google-maps'

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
;(async () => {
  Vue.config.productionTip = true
  Vue.use(Vuetify)
  Vue.use(VueGoogleMaps, {
    load: {
      key: await store.dispatch('getGoogleApiKey'),
      libraries: 'places'
    }
  })
  Vue.component('marquee-text', MarqueeText)
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})()
