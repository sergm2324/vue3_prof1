import axios from 'axios'
import {error} from '../../utils/error'

export default {
    namespaced: true,
    state() {
        return {
            products: []
        }
    },
    mutations: {
        loadProducts(state, payload) {
            state.products = payload
        },

    },
    actions: {
        async loadAllProducts({ commit, dispatch }) {
            try {
                const url = 'http://localhost:3000/products'
                const {data} = await axios.get(url)
                commit('loadProducts', data)
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
        getProducts(state) {
            return state.products
        },
    }
}