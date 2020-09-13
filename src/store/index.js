import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        rooms: [],
        user: {},
        chatConnection: undefined
    },
    mutations: {
        setRooms(state, rooms) {
            state.rooms = rooms;
        },
        setUser(state, user) {
            state.user = user;
        },
        setChatConnection(state, chatConnection) {
            state.chatConnection = chatConnection;
        }
    },
    actions: {
        async getRooms({ commit, state }) {
            try{
                if(state.chatConnection){
                    const rooms = await state.chatConnection.getRooms();
                    commit('setRooms', rooms);
                }
            } catch (err) {
                console.log('Error while loading rooms: ', err);
            }
        },
        async createRoom({ state }, payload) {
            try{
                if (state.chatConnection){
                    const { orderId } = payload;
                    await state.chatConnection.createRoomByOrder(orderId);
                }
            } catch (err) {
                alert(`An error occurred: ${err.message}`);
            }
        }
    },
    modules: {
    }
});
