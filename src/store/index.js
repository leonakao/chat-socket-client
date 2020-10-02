import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        rooms: [],
        user: {},
        chatConnection: undefined,
        orders: [
            { name: 'Order from Edis Lanches e Pizzarias', id: '500007', user: '17443', restaurant: '641', delivery: '618' },
            { name: 'Order from Idaina Kami Sushi Bar', id: '500006', user: '43149', restaurant: '154', delivery: '154' },
            { name: 'Order from Ticos Burger', id: '500001', user: '40003', restaurant: '316', delivery: '344' },
            { name: 'Order from Koichi', id: '500003', user: '43151', restaurant: '375', delivery: '341' },
            { name: 'Order from Pastel do Trevo de Bertioga - Caraguá', id: '500004', user: '35052', restaurant: '529', delivery: '503' },
            { name: 'Order from DON CORLEONE PIZZARIA 7 sabores 29.99 cada', id: '500005', user: '30514', restaurant: '328', delivery: '305' }
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
                    commit('setRooms', rooms.data);
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
        async findRoomWithRestaurantByOrder({ state }, orderId) {
            try{
                if (state.chatConnection){
                    return await state.chatConnection.findRoomWithRestaurantByOrder(orderId);
                }
            } catch (err) {
                alert(`An error occurred: ${err.message}`);
            }
        },
        async findRoomWithUserByOrder({ state }, orderId) {
            try{
                if (state.chatConnection){
                    return await state.chatConnection.findRoomWithUserByOrder(orderId);
                }
            } catch (err) {
                alert(`An error occurred: ${err.message}`);
            }
        },
        async findRoomWithDeliveryByOrder({ state }, orderId) {
            try{
                if (state.chatConnection){
                    return await state.chatConnection.findRoomWithDeliveryByOrder(orderId);
                }
            } catch (err) {
                alert(`An error occurred: ${err.message}`);
            }
        },
        async findRoomById({ state }, roomId) {
            try {
                if (state.chatConnection){
                    return await state.chatConnection.findRoomById(roomId);
                }
            } catch (err) {
                alert(`An error occurred: ${err.message}`);
            }
        },
        async findRoomByUser({ state }, userId) {
            try {
                if (state.chatConnection){
                    return await state.chatConnection.findRoomByUser(userId);
                }
            } catch (err) {
                alert(`An error occurred: ${err.message}`);
            }
        },
        async findRoomByRestaurant({ state }, restaurantId) {
            try {
                if (state.chatConnection){
                    return await state.chatConnection.findRoomByRestaurant(restaurantId);
                }
            } catch (err) {
                alert(`An error occurred: ${err.message}`);
            }
        },
        async findRoomByDelivery({ state }, deliveryId) {
            try {
                if (state.chatConnection){
                    return await state.chatConnection.findRoomByDelivery(deliveryId);
                }
            } catch (err) {
                alert(`An error occurred: ${err.message}`);
            }
        }
    },
    modules: {
    }
});
