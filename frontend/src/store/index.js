import Vue from 'vue'
import Vuex from 'vuex'
import ServicePosts from '@/service/ServicePosts'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: []
  },
  mutations: {
    SAVE_POSTS(state, posts) {
      state.posts = posts;
    },
    CREATE_POST (state, newPost) {
      state.posts.unshift(newPost)
      state.posts = [...state.posts]
    },
    DELETE_POST (state, id_post) {
      state.posts = state.posts.filter(post => post.id_post !== id_post)
    },
  
  },

  actions: {
    loadPosts({commit}) {
      ServicePosts.getAllPosts()
        .then(result => {
        commit('SAVE_POSTS', result.data);
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
