import io from 'socket.io-client';

export default () => {
    const socket = io('http://localhost:3333', {
        query: {
            Authorization: 'token'
        },
        forceNew: true
    });

    socket.on('connect', () => {
        console.log(`connected: ${socket.id}`);
    });

    socket.on('disconnect', reason => {
        console.log('disconnected: ' + reason);
    });

    socket.on('error', error => {
        console.log('error: ', error);
    });

    return socket;
};