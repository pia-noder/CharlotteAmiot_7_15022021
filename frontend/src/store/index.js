import Vue from 'vue'
import Vuex from 'vuex'
import ServicePosts from '@/service/ServicePosts'
import ServiceAuthentification from '@/service/ServiceAuthentification'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    userPosts: [],
    notifications:[],
    message:'',
    user:[],
  },
  mutations: {
    GET_ONE_USER(state, user) {
      state.user = user;
    },
    MODIFIED_USER(state, user){
      state.user = []
      state.user = user
    },
    GET_POSTS(state, posts) {
      state.posts = posts;
    },
    GET_USER_POSTS(state, posts) {
      state.userPosts = posts;
    },
    CREATE_POST (state, newPost) {
      state.posts.unshift(newPost)
      state.posts = [...state.posts]
      state.userPosts.unshift(newPost)
      state.userPosts = [...state.userPosts]
    },
    DELETE_POST (state, id_post) { 
      state.posts = state.posts.filter(post => post.id !== id_post)
      state.userPosts = state.userPosts.filter(userPost => userPost.id !== id_post)
    },
  
  },

  actions: {
    loadUser({commit}, userId) {
      ServiceAuthentification.getOneUser(userId)
        .then(result => {
        commit('GET_ONE_USER', result.data);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    },
    modifyUser({commit}, data) {
      ServiceAuthentification.modifyUser(data.userId, data.formData)
      .then(result => {
        commit('MODIFIED_USER', result.data);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    },

    loadPosts({commit}) {
      ServicePosts.getAllPosts()
        .then(result => {
        commit('GET_POSTS', result.data);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    },

    loadUserPosts({commit}, userId) {
      
      ServicePosts.getUserPosts(userId)
        .then(result => {
        commit('GET_USER_POSTS', result.data);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    },

    createPosts({commit}, formData) {
      ServicePosts.createOnePost(formData)
      .then(result => {
        commit('CREATE_POST', result.data[0]);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    },

    deletePost ({ commit }, id_post) {
      console.log(id_post)
      ServicePosts.deleteOnePost(id_post)
        .then(() => commit('DELETE_POST', id_post))
        .catch(error => {
          console.log({ error: error })
          commit('ERROR_MESSAGE', 'Problème de connexion')
        })
    },

  },

  modules: {
  },
})
