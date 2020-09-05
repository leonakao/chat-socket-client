import io from 'socket.io-client';

export default (user) => {
    const socket = io('http://localhost:3333/chat', {
        query: {
            Authorization: user.token,
            userId: user.id,
            userAuthentication: undefined,
            userName: user.name
        }
    });

    let connected = false;

    const rooms = [];

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
        const { roomId, message } = payload;

        const room = rooms.find(room => room.id === roomId);

        if(room) {
            room.callback(message);
        }
    });

    window.chatConnection = {
        useChat: (roomId, callback) => {
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
        },
        sendMessage: (roomId, message) => {
            if(!connected) {
                new Error('You must be connected');
            }

            socket.emit('newMessage', {
                roomId,
                message
            });
        }
    };
    return window.ChatConnection;
};