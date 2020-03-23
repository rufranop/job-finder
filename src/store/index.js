import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        isMobile: window.innerWidth <= 600,
        showMobileModal: false,
        positions: false,
        isLoading: true
    },

    getters: {
        getMobileStatus: state => {
            return state.isMobile
        },
        getMobileModalStatus: state => {
            return state.showMobileModal
        },
        getPositions: state => {
            return state.positions
        },
        getLoading: state => {
            return state.isLoading
        }
    },

    mutations: {
        changeModalVisibility(state, payload) {
            state.showMobileModal = payload
        },
        positions(state, payload) {
            state.positions = payload
        },
        loading(state, payload) {
            state.isLoading = payload
        }
    },

    actions: {
        updateModalVisibility({commit}, payload) {
            commit('changeModalVisibility', payload)
        },
        updatePositions({commit}, payload) {
            commit('positions', payload)
        },
        toggleLoading({commit}, payload) {
            commit('loading', payload)
        }
    }
})

