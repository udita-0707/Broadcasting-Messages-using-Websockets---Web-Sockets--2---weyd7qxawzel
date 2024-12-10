const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Create an Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Handle a basic route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for 'message' events from this client
  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Broadcast the message to all other clients
    socket.broadcast.emit('message', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = {app}