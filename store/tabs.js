export const state = () => ({
    tab_current_val: ''
})

export const getters = {
    toggleCurrentTab(state) {
      return state.tab_current_val
    },
}

export const mutations = {
    toggleCurrentTab(state, data) {
      state.readOnly = data
    }
  }

export const actions = {
    changeCurrentTab({ commit }, payload) {
        // make request
        console.log('payload', payload)
        // commit('toggleReadOnly',payload)
        commit(CONSTANTS.TOGGLE_CURRENT_TAB, payload);
    }
}