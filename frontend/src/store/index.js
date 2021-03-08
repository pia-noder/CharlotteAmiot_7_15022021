import Vue from 'vue'
import Vuex from 'vuex'
import setAuthToken from '@/service/APIClient'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    userId: null,
    username:null,
    isUserLoggedIn: false,
    postList: []
  },
  mutations: {
    SET_TOKEN( state, token ) {
      state.token = token
      if (token){
        state.isUserLoggedIn = true;
        setAuthToken(token);
      } else {
        state.isUserLoggedIn = false;
      }
    },
    SET_ID( state, userId ) {
      state.userId = userId
    },
    SET_USERNAME( state, username ) {
      state.username = username
    },
  },
  actions: {
    setToken( {commit}, token ) {
      commit('SET_TOKEN', token)
    },
    setUser({commit}, userId) {
      commit('SET_ID', userId)
    },
    setUsername({commit}, username) {
      commit('SET_USERNAME', username)
    }
  },
  modules: {
  }
})
