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