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
            useChat: async (roomId, callbacks = {
                newMessage: () => {},
                messagesViewed: () => {},
            }) => {
                if(!connected) {
                    new Error('You must be connected');
                }

                const roomExist = rooms.find(room => room.id === roomId);
                if(roomExist && roomExist.callbacks !== callbacks) {
                    rooms[rooms.indexOf(roomExist)].callbacks = callbacks;
                } else if (!roomExist) {
                    rooms.push({
                        id: roomId,
                        callbacks: {
                            newMessage: callbacks.newMessage || (() => {}),
                            messagesViewed: callbacks.messagesViewed || (() => {})
                        }
                    });
                }

                try{
                    const request = await api.get('/room/messages/' + roomId);
                    return request.data;
                } catch (err) {
                    console.log('Error while getting history chat: '  + err);
                }
            },
            sendMessage: async (roomId, message) => {
                if(!connected) {
                    throw new Error('You must be connected');
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
                await api.post('/room', {
                    name: `Order ${orderId}`,
                    orderId
                });
            },
            findRoomWithRestaurantByOrder: async (orderId) => {
                const { data } = await api.get(`/room/order/${orderId}/shop`);
                return data;
            },
            findRoomWithUserByOrder: async (orderId) => {
                const { data } = await api.get(`/room/order/${orderId}/customer`);
                return data;
            },
            findRoomWithDeliveryByOrder: async (orderId) => {
                const { data } = await api.get(`/room/order/${orderId}/delivery`);
                return data;
            },
            findRoomByUser: async (customerId) => {
                const { data } = await api.get(`/room/customer/${customerId}`);
                return data;
            },
            findRoomByRestaurant: async (shopId) => {
                const { data } = await api.get(`/room/shop/${shopId}`);
                return data;
            },
            findRoomByDelivery: async (deliveryId) => {
                const { data } = await api.get(`/room/delivery/${deliveryId}`);
                return data;
            },
            findRoomById: async (roomId) => {
                const { data } = await api.get(`/room/${roomId}`);
                return data;
            },
            messagesViewed: async (roomId) => {
                if(!connected) {
                    throw new Error('You must be connected');
                }

                socket.emit('messagesViewed', {
                    roomId,
                });
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

            if(room) room.callbacks.newMessage(message);
            else {
                console.log('Message received from new chat: ', message.room);
                newChatCallback(await window.chatConnection.findRoomById(message.room));
            }
        });

        socket.on('messagesViewed', async payload => {
            const { roomId } = payload;

            const room = rooms.find(room => room.id === roomId);

            if(room) room.callbacks.messagesViewed();
        });

        return window.chatConnection;
    };
})();