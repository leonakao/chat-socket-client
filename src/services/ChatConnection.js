import io from 'socket.io-client';

export default () => {
    const socket = io('http://localhost:3333', {
        transportOptions: {
            polling: {
                extraHeaders: {
                    'Authorization': 'abc'
                }
            }
        }
    });

    socket.on('connect', () => {
        console.log(`connected: ${socket.id}`);
    });

    socket.on('disconnect', () => {
        console.log('disconnected');
    });

    return socket;
};