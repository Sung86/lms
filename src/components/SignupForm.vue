<template>
  <div id="signup">
    <v-content fullscreen full-width>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="6" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Signup Form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <p
                    v-if="$store.getters.getErrorMessage"
                    style="color:red; text-align:center"
                  >
                    {{ $store.getters.getErrorMessage }}
                  </p>
                  <v-text-field
                    label="Email"
                    name="email"
                    v-model="formField.email"
                    prepend-icon="email"
                    type="eamil"
                  >
                  </v-text-field>

                  <v-text-field
                    label="Password"
                    name="password"
                    v-model="formField.password"
                    prepend-icon="lock"
                    :type="passwordFieldType"
                  >
                  </v-text-field>

                  <v-text-field
                    label="Confirm Password"
                    name="confirm-password"
                    v-model="formField.confirmPassword"
                    prepend-icon="lock"
                    :type="passwordFieldType"
                  >
                  </v-text-field>
                  <v-checkbox
                    v-model="maskPassword"
                    :label="`${maskPasswordLabel}`"
                  >
                  </v-checkbox>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn
                  title="Close"
                  @click="
                    $store.dispatch({
                      type: 'showForm',
                      formType: 'SignupForm',
                      toShow: false
                    })
                  "
                  color="primary"
                >
                  Close
                </v-btn>
                <v-btn title="Signup" color="primary" @click="onSignup">
                  Sign up
                </v-btn>
                <v-btn title="Login" color="primary" @click="goToLogin">
                  Login
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
import validate from '@/assets/validation'
export default {
  data: () => ({
    formField: {
      email: null,
      password: null,
      confirmPassword: null
    },
    passwordFieldType: 'password',
    maskPassword: false,
    maskPasswordLabel: 'Show my password',
    isSubmitted: false,
    errors: []
  }),
  mounted() {
    this.$store.dispatch('setErrorMessage', null)
    this.$store.dispatch('resetSignup')
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
    goToLogin() {
      this.$store.dispatch({
        type: 'showForm',
        formType: 'SignupForm',
        toShow: false
      })
      this.$store.dispatch({
        type: 'showForm',
        formType: 'LoginForm',
        toShow: true
      })
    },
    onSignup() {
      this.$store.dispatch('setErrorMessage', null)
      this.errors = []
      let form = this.formField
      if (form.email && form.password && form.confirmPassword) {
        for (const key in form) {
          if (form.hasOwnProperty(key)) {
            if (!validate(key, form[key])) {
              let error = key.charAt(0).toUpperCase() + key.slice(1)
              error = error.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
              this.errors.push(error)
            }
          }
        }
        if (this.errors.length > 0) {
          let msg = 'Invalid field(s): '
          this.errors.forEach(error => {
            msg += error + ', '
          })
          msg.substring(0, msg.length - 2)
          this.$store.dispatch('setErrorMessage', msg)
        } else {
          if (form.password === form.confirmPassword) {
            this.isSubmitted = true
            this.$store
              .dispatch('signupRequest', {
                email: form.email,
                password: form.password
              })
              .then(() => {
                if (this.$store.getters.getIsRegistered) {
                  this.isSubmitted = false
                  this.$store.dispatch({
                    type: 'showForm',
                    formType: 'SignupForm',
                    toShow: false
                  })
                } else {
                  this.$store.dispatch(
                    'setErrorMessage',
                    'Error! The email has been registered'
                  )
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
            this.$store.dispatch(
              'setErrorMessage',
              'Please make sure both passwords are same'
            )
          }
        }
      } else {
        this.$store.dispatch('setErrorMessage', 'Please fill in all fields')
      }
    }
  }
}
</script>
