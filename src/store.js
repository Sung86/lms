import Vue from 'vue'
import Vuex from 'vuex'

import firebase from 'firebase/app'
import { firebaseConfig } from './config/firebase-config'
import 'firebase/auth'

firebase.initializeApp(firebaseConfig)
Vue.use(Vuex)

function initialState() {
  return {
    showSignupForm: false,
    showLoginForm: false,
    isLogin: false,
    isRegistered: false,
    currentUser: null,
    errorMessage: null,
    systemErrorsLog: []
  }
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    if (user.metadata.lastSignInTime === user.metadata.creationTime) {
      firebase.auth().signOut()
    } else {
      store.commit('setUser', user)
      store.commit('loginSuccess', true)
    }
  }
})

let store = new Vuex.Store({
  state: initialState(),
  getters: {
    getCurrentUser: state => state.currentUser,
    getShowSignupForm: state => state.showSignupForm,
    getShowLoginForm: state => state.showLoginForm,
    getIsLogin: state => state.isLogin,
    getIsRegistered: state => state.isRegistered,
    getUsername: state => state.username,
    getErrorMessage: state => state.errorMessage
  },
  mutations: {
    clearErrorMessage: state => (state.errorMessage = null),
    loginSuccess: (state, val) => (state.isLogin = val),
    logSystemError: (state, error) => {
      state.systemErrorsLog.push({
        error: error,
        occurredTime: new Date()
      })
    },
    registerSuccess: (state, val) => (state.isRegistered = val),
    setErrorMessage: (state, error) => (state.errorMessage = error),
    setUser: (state, userInfo) => {
      state.currentUser = userInfo
    },
    showForm: (state, payload) => {
      switch (payload.formType) {
        case 'LoginForm':
          state.showLoginForm = payload.toShow
          break
        case 'SignupForm':
          state.showSignupForm = payload.toShow
          break
      }
    },
    resetState: state => {
      const newState = initialState()
      Object.keys(newState).forEach(key => {
        state[key] = newState[key]
      })
    }
  },
  actions: {
    showForm: ({ commit }, payload) => commit('showForm', payload),
    setErrorMessage: ({ commit }, error) => commit('setErrorMessage', error),
    clearErrorMessage: ({ commit }) => commit('clearErrorMessage'),
    logSystemError: ({ commit }, error) => commit('logSystemError', error),
    loginRequest: async ({ commit }, payload) => {
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          return firebase
            .auth()
            .signInWithEmailAndPassword(payload.email, payload.password)
            .then(() => {
              let userInfo = firebase.auth().currentUser
              commit('setUser', userInfo)
              commit('loginSuccess', true)
            })
            .catch(error => {
              commit('logSystemError', error.code + ': ' + error.message)
            })
        })
        .catch(error => {
          commit('logSystemError', error.code + ': ' + error.message)
        })
    },
    // eslint-disable-next-line no-unused-vars
    signupRequest: async ({ commit }, userInfo) => {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
        .then(response => {
          commit('registerSuccess', true)
          const email = response.user.email
          const splitPosition = email.lastIndexOf('@')
          const username = email.substring(0, splitPosition)

          const user = firebase.auth().currentUser
          if (!user.emailVerified) user.sendEmailVerification()

          user
            .updateProfile({
              displayName: username
            })
            .catch(error => {
              commit('logSystemError', error)
            })
        })
        .catch(error => {
          commit('logSystemError', error.code + ': ' + error.message)
        })
    },
    resetSignup: ({ commit }) => commit('registerSuccess', false),
    logoutRequest: ({ commit }) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit('resetState')
        })
        .catch(error => {
          commit('logSystemError', error)
        })
    },
    getGoogleApiKey: async () => {
      require('firebase/firestore')
      let firestore = firebase.firestore()

      return await firestore
        .collection('GoogleApiKey')
        .doc('b5rL7WyR3b3MLULavpls')
        .get()
        .then(doc => {
          return doc.data().key
        })
    }
  }
})

export default store
