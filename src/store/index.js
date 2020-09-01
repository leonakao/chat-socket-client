import Vue from 'vue';
import Vuex from 'vuex';
import request from '../plugins/axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        rooms: []
    },
    mutations: {
        setRooms(state, rooms) {
            state.rooms = rooms;
        }
    },
    actions: {
        async getRooms({ commit }) {
            const result = await request.get('/rooms');
            commit('setRooms', result.data);
        }
    },
    modules: {
    }
});
