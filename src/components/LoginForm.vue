<template>
  <div id="loginForm">
    <v-content fullscreen full-width>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="6" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login Form</v-toolbar-title>
              </v-toolbar>
              <p
                v-if="$store.getters.getErrorMessage"
                style="color:red; text-align:center"
              >
                {{ $store.getters.getErrorMessage }}
              </p>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
                    name="email"
                    v-model="email"
                    prepend-icon="email"
                    type="text"
                  >
                  </v-text-field>

                  <v-text-field
                    label="Password"
                    name="password"
                    v-model="password"
                    prepend-icon="lock"
                    :type="passwordFieldType"
                  >
                  </v-text-field>
                  <v-checkbox
                    v-model="maskPassword"
                    :label="`${maskPasswordLabel}`"
                  ></v-checkbox>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn
                  title="Close"
                  @click="
                    $store.dispatch({
                      type: 'showForm',
                      formType: 'LoginForm',
                      toShow: false
                    }),
                      $store.dispatch('clearErrorMessage')
                  "
                  color="primary"
                >
                  Close
                </v-btn>
                <v-btn title="Signup" color="primary" @click="goToSignup">
                  Signup
                </v-btn>
                <v-btn title="Login" color="primary" @click="onLogin">
                  Log in
                </v-btn>
              </v-card-actions>
              <div v-if="isSubmitted" class="text-center blackout">
                <v-overlay opacity="0.9">
                  <v-row justify="center">
                    <v-progress-circular
                      indeterminate
                      color="blue"
                      size="130"
                      width="15"
                    >
                      Validating . . .
                    </v-progress-circular>
                  </v-row>
                </v-overlay>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>
<script>
export default {
  data: () => ({
    email: null,
    password: null,
    passwordFieldType: 'password',
    maskPassword: false,
    maskPasswordLabel: 'Show my password',
    isSubmitted: false
  }),
  mounted() {
    this.$store.dispatch('setErrorMessage', null)
  },
  watch: {
    maskPassword: function() {
      if (this.maskPassword) {
        this.maskPasswordLabel = 'Hide password'
        this.passwordFieldType = 'text'
      } else {
        this.maskPasswordLabel = 'Show password'
        this.passwordFieldType = 'password'
      }
    }
  },
  methods: {
    goToSignup() {
      this.$store.dispatch({
        type: 'showForm',
        formType: 'LoginForm',
        toShow: false
      })
      this.$store.dispatch({
        type: 'showForm',
        formType: 'SignupForm',
        toShow: true
      })
    },
    onLogin() {
      this.$store.dispatch('setErrorMessage', null)

      if (this.email && this.password) {
        this.isSubmitted = true
        this.$store
          .dispatch('loginRequest', {
            email: this.email,
            password: this.password
          })
          .then(() => {
            if (this.$store.getters.getIsLogin) {
              this.isSubmitted = false
              this.$store.dispatch({
                type: 'showForm',
                formType: 'LoginForm',
                toShow: false
              })
            } else {
              this.$store.dispatch('setErrorMessage', 'Invalid Account')
              this.isSubmitted = false
            }
          })
          .catch(error => {
            this.isSubmitted = false
            this.$store.dispatch(
              'setErrorMessage',
              'Error! Please contact support service.'
            )
            this.$store.dispatch('logSystemError', error)
          })
      } else {
        this.$store.dispatch('setErrorMessage', 'Please fill in all fields')
      }
    }
  }
}
</script>
