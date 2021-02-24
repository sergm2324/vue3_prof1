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
        addCategory(state, category) {
            state.categories.push(category)
        }
    },
    actions: {
        async loadAllCategories({ commit }) {
            const url = 'http://localhost:3000/categories'
            const {data} = await axios.get(url)
            commit('loadCategories', data)
        },
        async create({ commit, dispatch }, payload) {
            try {
                const {data} = await axios.post(`http://localhost:3000/categories`, payload)
                commit('addCategory', {...payload, id: data.id})
                dispatch('setMessage', {
                    value: 'Категория успешно добавлена',
                    type: 'primary'
                }, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
    },
    getters: {
        getCategories(state) {
            return state.categories
        },
    }
}
