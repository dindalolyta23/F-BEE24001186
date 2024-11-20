const { Server } = require('socket.io');

let io; // Deklarasi variabel `io`

const initializeWebSocket = (server) => {
    io = new Server(server);

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        // Event 'disconnect'
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};

const getIoInstance = () => {
    return new Promise((resolve, reject) => {
        if (io) {
            resolve(io);
        } else {
            reject(new Error('Socket.io instance is not initialized'));
        }
    });
};

module.exports = {
    initializeWebSocket,
    getIoInstance
};