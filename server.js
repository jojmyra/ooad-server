const http = require('http');
const app = require('./app');

const port = process.env.PORT || global.gConfig.node_port;

const server = http.createServer(app);

server.listen(port, () => console.log(`server running on port ${port}`));