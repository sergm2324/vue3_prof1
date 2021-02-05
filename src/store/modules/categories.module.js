import axios from 'axios'
import {error} from '../../utils/error'

export default {
    namespaced: true,
    state() {
        return {
            categories: []
        }
    },
    mutations: {
        loadCategories(state, payload) {
            state.categories = payload
        },

    },
    actions: {
        async loadAllCategories({ commit, dispatch }) {
            try {
                const url = 'http://localhost:3000/categories'
                const {data} = await axios.get(url)
                commit('loadCategories', data)
            } catch (e) {
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        }
    },
    getters: {
        getCategories(state) {
            return state.categories
        },
    }
}
