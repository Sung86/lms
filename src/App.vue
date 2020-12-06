<template>
  <v-app>
    <Header />
    <div>
      <v-overlay
        :value="
          $store.getters.getShowLoginForm || $store.getters.getShowSignupForm
        "
        opacity="0.9"
      />
      <v-row justify="center">
        <LoginForm
          :style="stylePopupForm"
          v-if="$store.getters.getShowLoginForm"
        />
        <SignupForm
          :style="stylePopupForm"
          v-if="$store.getters.getShowSignupForm"
        />
        <PopupDialog
          :dialogMessage="message"
          :okayBtn="true"
          v-if="$store.getters.getIsRegistered"
        />

        <PopupDialog
          :dialogMessage="'Make sure you have internet connection!'"
          :okayBtn="true"
          v-if="internetConnection === false"
        />
      </v-row>

      <router-view />
      <Footer style="margin-top:200px" />
    </div>
  </v-app>
</template>
<script>
import Header from './components/Header'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import PopupDialog from './components/PopupDialog'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    LoginForm,
    SignupForm,
    PopupDialog
  },
  data: () => ({
    internetConnection: null,
    message: `You've successfully registered. Please click "Okay" and login.`,
    stylePopupForm: {
      width: '100%',
      zIndex: '100',
      position: 'fixed'
    }
  }),
  mounted() {
    setInterval(() => {
      if (!navigator.onLine) {
        this.internetConnection = false
        setTimeout(() => {
          this.internetConnection = null
        }, 1000)
      }
    }, 2000)
  }
}
</script>
<style>
.blackout {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 998;
  height: 100%;
  width: 100%;
}
</style>
