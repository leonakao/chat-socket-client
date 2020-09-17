import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        rooms: [],
        user: {},
        chatConnection: undefined,
        orders: [
            { name: 'Order 001', id: '1', user: '1', restaurant: '1', delivery: '1' },
            { name: 'Order 002', id: '2', user: '2', restaurant: '2', delivery: '2' },
            { name: 'Order 003', id: '3', user: '3', restaurant: '3', delivery: '3' },
            { name: 'Order 004', id: '4', user: '4', restaurant: '4', delivery: '4' },
            { name: 'Order 005', id: '5', user: '5', restaurant: '5', delivery: '5' },
            { name: 'Order 006', id: '6', user: '6', restaurant: '6', delivery: '6' }
        ],
        orderRooms: []
    },
    getters: {
        getOrders: state => {
            return state.orders.filter(order => {
                if(state.user.identification === process.env.VUE_APP_TOKEN_SERVICE_USER && order.user == state.user.id) return true;
                if(state.user.identification === process.env.VUE_APP_TOKEN_SERVICE_RESTAURANT && order.restaurant == state.user.id) return true;
                if(state.user.identification === process.env.VUE_APP_TOKEN_SERVICE_DELIVERY && order.delivery == state.user.id) return true;
                return false;
            });
        }
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
        },
        openRoom(state, room) {
            if(!state.orderRooms.find(orderRoom => orderRoom._id === room._id))
                state.orderRooms.push(room);
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
        },
        async findRoomByOrder({ state }, orderId) {
            try{
                if (state.chatConnection){
                    return await state.chatConnection.findRoomByOrder(orderId);
                }
            } catch (err) {
                alert(`An error occurred: ${err.message}`);
            }
        },
        async findRoomById({state}, roomId) {
            try{
                if (state.chatConnection){
                    return await state.chatConnection.findRoomById(roomId);
                }
            } catch (err) {
                alert(`An error occurred: ${err.message}`);
            }
        }
    },
    modules: {
    }
});
