import Vue from 'vue';
import Vuex from 'vuex';
import request from '../plugins/axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        rooms: [],
        user: {}
    },
    mutations: {
        setRooms(state, rooms) {
            state.rooms = rooms;
        },
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        async getRooms({ commit, state }) {
            const result = await request.get('/rooms', {
                headers: {
                    Authorization: state.user.token || ''
                }
            });
            commit('setRooms', result.data);
        },
        async createRoom({ state }, payload) {
            const { orderId } = payload;

            await request.post('/rooms', {
                name: `Order ${orderId}`,
                orderId
            }, {
                headers: {
                    Authorization: state.user.token || ''
                }
            });
        }
    },
    modules: {
    }
});
