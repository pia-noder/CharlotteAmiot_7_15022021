import Vue from 'vue'
import Vuex from 'vuex'
import setAuthToken from '@/service/APIClient'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    userId: null,
    isFormData: false,
    isUserLoggedIn: false,
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
    
    SET_FORMDATA( state){

      state.isFormData = true;
    }
  },

  actions: {
    setToken( {commit}, token ) {
      commit('SET_TOKEN', token)
    },
    setUser({commit}, userId) {
      commit('SET_ID', userId)
    },
    setFormData({commit}) {
      commit('SET_FORMDATA');
    }
  },

  modules: {
  }
})
