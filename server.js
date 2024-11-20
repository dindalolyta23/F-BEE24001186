require('dotenv').config();
const app = require('./src/app');
const PORT = process.env.PORT || 3000;
//config socket io
const http = require('http');
const server = http.createServer(app);
const {initializeWebSocket} = require('./src/configs/socket');
initializeWebSocket(server);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});