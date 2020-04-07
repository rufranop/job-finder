import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        isMobile: window.innerWidth <= 600,
        showMobileModal: false,
        positions: false,
        isLoading: true,
        savedPositions: []
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
        },
        getSavedPositions: state => {
            return state.savedPositions
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
        },
        addSavedPosition(state, payload) {
            state.savedPositions.push(payload);
            window.localStorage.setItem('savedPositions', JSON.stringify(state.savedPositions));
        },
        removeSavedPosition(state, positionID) {
            state.savedPositions = state.savedPositions.filter(position => {
                return position.id !== positionID
            });
            window.localStorage.setItem('savedPositions', JSON.stringify(state.savedPositions));
        },
        addPositions(state, payload) {
            state.savedPositions = payload;
            window.localStorage.setItem('savedPositions', JSON.stringify(state.savedPositions));
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
        },
        addSavedPosition({commit}, payload) {
            commit('addSavedPosition', payload)
        },
        removeSavedPosition({commit}, positionID) {
            commit('removeSavedPosition', positionID)
        },
        populateSavedPositions({commit}, payload) {
            commit('addPositions', payload)
        }
    }
});

