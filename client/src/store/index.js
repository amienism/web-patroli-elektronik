import Vuex from 'vuex'
import vuetify from '../plugins/vuetify'

export const store = new Vuex.Store({
  state: {
    layout: 'blankLayout',
    loader: false,
    user: null,
    drawer: true,
  },
  mutations: {
    SET_LAYOUT (state, payload) {
      state.layout = payload
    },
    SET_LOADER (state, payload) {
      state.loader = payload
    },
    SET_USER(state, payload){
      state.user = payload
    },
    SET_DRAWER(state, payload){
      state.drawer = payload
    }
  },
  getters: {
    layout (state) {
      return state.layout
    },
  }
})

export default store