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
        addProduct(state, product) {
            state.products.push(product)
        }
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
        },
        async create({ commit, dispatch }, payload) {
            try {
                const {data} = await axios.post(`http://localhost:3000/products`, payload)
                commit('addProduct', {...payload, id: data.id})
                dispatch('setMessage', {
                    value: 'Инвентарь успешно добавлен',
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
        getProducts(state) {
            return [
                ...state.products.filter(p => p.count !== 0),
                ...state.products.filter(p => p.count === 0)
            ]
        },
    }
}
