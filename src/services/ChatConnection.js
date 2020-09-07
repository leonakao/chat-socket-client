import io from 'socket.io-client';
import axios from 'axios';

export default (user) => {
    if(window.chatConnection !== undefined) return window.chatConnection;

    const socket = io('http://localhost:3333/chat', {
        query: {
            Authorization: user.token,
            userId: user.id,
            userAuthentication: undefined,
            userName: user.name
        }
    });

    const api = axios.create({
        baseURL: 'http://localhost:3333',
        headers: {
            Authorization: user.token
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

    socket.on('newMessage', payload => {
        const message = payload;

        const room = rooms.find(room => room.id === message.room);

        console.log(room, message);
        if(room) room.callback(message);
        else {
            console.log('Message received from new chat: ', message.room);
            newChatCallback(window.chatConnection.useChat(message.room));
        }
    });

    return window.chatConnection;
};