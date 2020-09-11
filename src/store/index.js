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
            try{
                const result = await request.get('/rooms', {
                    headers: {
                        Authorization: state.user.token || ''
                    }
                });
                commit('setRooms', result.data);
            } catch (err) {
                if(err.response.status !== 401){
                    console.log('Error while loading rooms: ', err);
                }
                alert(`An error occurred: ${err.message}`);
            }
        },
        async createRoom({ state }, payload) {
            try{
                const { orderId } = payload;

                await request.post('/rooms', {
                    name: `Order ${orderId}`,
                    orderId
                }, {
                    headers: {
                        Authorization: state.user.token || ''
                    }
                });
            } catch (err) {
                alert(`An error occurred: ${err.message}`);
            }
        }
    },
    modules: {
    }
});
