<template>
  <div id="top-nav">
    <div v-if="!$store.getters.getIsLogin">
      <router-link :to="{ name: 'home' }">
        <v-btn title="Home" icon>
          <v-icon>home</v-icon>
        </v-btn>
      </router-link>
      <v-btn title="Login" @click="showForm('Login')" icon>
        <v-icon>person</v-icon>
      </v-btn>

      <v-btn title="Signup" @click="showForm('Signup')" icon>
        <v-icon>person_add</v-icon>
      </v-btn>
    </div>
    <div v-else>
      <router-link :to="{ name: 'home' }">
        <v-btn title="Home" icon>
          <v-icon>home</v-icon>
        </v-btn>
      </router-link>
      <v-btn title="Logout" @click="$store.dispatch('logoutRequest')" icon>
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({}),
  components: {},
  computed: {},
  methods: {
    showForm(formType) {
      switch (formType) {
        case 'Login':
          this.$store.dispatch({
            type: 'showForm',
            formType: 'LoginForm',
            toShow: !this.$store.getters.getShowLoginForm
          })
          if (this.$store.getters.getShowSignupForm) this.closeForm('Signup')

          break
        case 'Signup':
          this.$store.dispatch({
            type: 'showForm',
            formType: 'SignupForm',
            toShow: !this.$store.getters.getShowSignupForm
          })
          if (this.$store.getters.getShowLoginForm) this.closeForm('Login')

          break
      }
    },
    closeForm(formType) {
      this.$store.dispatch({
        type: 'showForm',
        formType: `${formType}Form`,
        toShow: false
      })
    }
  }
}
</script>
