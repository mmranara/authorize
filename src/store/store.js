import { firebaseAuth, firebaseDb } from 'boot/firebase'

const state = {
  userDetails: {}
}
const mutations = {
  setUserDetails (state, payload) {
    state.userDetails = payload
  }
}
const actions = {
  registerUser (importantThing = {}, payload) {
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log(response)
        let userId = firebaseAuth.currentUser.uid
        firebaseDb.ref('admin/' + userId).set({
          name: payload.name,
          mobile: payload.mobile,
          address: payload.address,
          email: payload.email,
          online: true
        })
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  loginUser (importantThing = {}, payload) {
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  logoutUser () {
    firebaseAuth.signOut()
  },

  handleAuthStateChanged ({ commit, dispatch, state }) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        // User is logged in.
        let userId = firebaseAuth.currentUser.uid
        firebaseDb.ref('admins/' + userId).once('value', snapshot => {
          let userDetails = snapshot.val()
          commit('setUserDetails', {
            name: userDetails.name,
            mobile: userDetails.mobile,
            address: userDetails.address,
            email: userDetails.email
          })
        })
        dispatch('firebaseUpdateUser', {
          userId: state.userDetails.userId,
          updates: {
            online: false
          }
        })
        this.$router.push('/index')
      } else {
        // User is logged out.
        dispatch('firebaseUpdateUser', {
          userId: state.userDetails.userId,
          updates: {
            online: false
          }
        })
        commit('setUserDetails', {})
        this.$router.replace('/')
      }
    })
  },

  firebaseUpdateUser (importantThing = {}, payload) {
    if (payload.userId) {
      firebaseDb.ref('users/' + payload.userId).update(payload.updates)
    }
  }
}
const getters = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
