import Vuex from 'vuex'
import vuetify from '../plugins/vuetify'

export const store = new Vuex.Store({
  state: {
    layout: 'appLayout',
    loader: false,
    user: null,
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
    }
  },
  getters: {
    layout (state) {
      return state.layout
    },
  }
})

export default store