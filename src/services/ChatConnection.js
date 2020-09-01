import io from 'socket.io-client';

export default () => {
    const socket = io('http://localhost:3333/chat', {
        query: {
            Authorization: 'user',
            userId: '1',
            userAuthentication: undefined,
            userName: 'teste'
        }
    });

    socket.on('connect', () => {
        console.log(`connected: ${socket.id}`);
    });

    socket.on('disconnect', reason => {
        console.log('disconnected: ' + reason);
    });

    socket.on('error', error => {
        if(error.type === 'authorization_error') {
            console.error(error.message);
        } else {
            console.log('error: ', error);
        }
    });

    return socket;
};