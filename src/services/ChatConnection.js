import io from 'socket.io-client';
import axios from 'axios';

export default (() => {
    if(window.chatConnection !== undefined) return window.chatConnection;
    return (user, identification) => {
        const socket = io(process.env.VUE_APP_CHAT_SERVICE_URL || '', {
            query: {
                Identification: process.env.VUE_APP_CHAT_IDENTIFICATION_KEY || identification,
                Authorization: user.token,
            }
        });

        const api = axios.create({
            baseURL: process.env.VUE_APP_API_BASE_URL || '',
            headers: {
                Identification: process.env.VUE_APP_CHAT_IDENTIFICATION_KEY || identification,
                Authorization: user.token,
            }
        });

        let connected = false;

        const rooms = [];
        let newChatCallback = () => {};

        window.chatConnection = {
            useChat: async (roomId, callback = () => {}) => {
                if(!connected) {
                    new Error('You must be connected');
                }

                const roomExist = rooms.find(room => room.id === roomId);
                if(roomExist && roomExist.callback !== callback) {
                    rooms[rooms.indexOf(roomExist)].callback = callback;
                } else if (!roomExist) {
                    rooms.push({
                        id: roomId,
                        callback
                    });
                }

                try{
                    const request = await api.get('/rooms/messages/' + roomId);
                    return request.data;
                } catch (err) {
                    console.log('Error while getting history chat: '  + err);
                }
            },
            sendMessage: async (roomId, message) => {
                if(!connected) {
                    new Error('You must be connected');
                }

                socket.emit('newMessage', {
                    roomId,
                    message
                });
            },
            setNewChatCallback: async (callback) => {
                newChatCallback = callback;
            },
            getRooms: async () => {
                const result = await api.get('/rooms');
                return result.data;
            },
            createRoomByOrder: async (orderId) => {
                await api.post('/rooms', {
                    name: `Order ${orderId}`,
                    orderId
                });
            },
            findRoomWithRestaurantByOrder: async (orderId) => {
                const { data } = await api.get(`/rooms/order/${orderId}/restaurant`);
                return data;
            },
            findRoomWithUserByOrder: async (orderId) => {
                const { data } = await api.get(`/rooms/order/${orderId}/user`);
                return data;
            },
            findRoomWithDeliveryByOrder: async (orderId) => {
                const { data } = await api.get(`/rooms/order/${orderId}/delivery`);
                return data;
            },
            findRoomByUser: async (userId) => {
                const { data } = await api.get(`/rooms/user/${userId}`);
                return data;
            },
            findRoomByRestaurant: async (restaurantId) => {
                const { data } = await api.get(`/rooms/restaurant/${restaurantId}`);
                return data;
            },
            findRoomById: async (roomId) => {
                const { data } = await api.get(`/rooms/${roomId}`);
                return data;
            }
        };

        socket.on('connect', () => {
            console.log(`connected: ${socket.id}`);
            connected = true;
        });

        socket.on('disconnect', reason => {
            console.log('disconnected: ' + reason);
            connected = false;
        });

        socket.on('error', error => {
            if(error.type === 'authorization_error') {
                console.error(error.message);
            } else {
                console.log('error: ', error);
            }
        });

        socket.on('newMessage', async payload => {
            const message = payload;

            const room = rooms.find(room => room.id === message.room);

            if(room) room.callback(message);
            else {
                console.log('Message received from new chat: ', message.room);
                newChatCallback(await window.chatConnection.findRoomById(message.room));
            }
        });

        return window.chatConnection;
    };
})();