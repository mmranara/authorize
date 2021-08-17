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
        firebaseDb.ref('users/' + userId).set({
          name: payload.name,
          type: payload.type,
          level: payload.level,
          contact: payload.contact,
          contact1: payload.contact1,
          address: payload.address,
          email: payload.email,
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
        firebaseDb.ref('users/' + userId).once('value', snapshot => {
          let userDetails = snapshot.val()
          commit('setUserDetails', {
            name: userDetails.name,
            middlename: userDetails.middlename,
            type: userDetails.type,
            level: userDetails.level,
            address: userDetails.address,
            contact: userDetails.contact,
            contact1: userDetails.contact1,
            userId: userId
          })
        })
        dispatch('firebaseUpdateUser', {
          userId: userId,
          updates: {
          }
        })
        this.$router.push('/mestablishment')
      } else {
        // User is logged out.
        dispatch('firebaseUpdateUser', {
          userId: state.userDetails.userId,
          updates: {
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
