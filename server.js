const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Store connected clients
const clients = new Set();

// Serve static files
app.use(express.static(__dirname));

// WebSocket connection handler
wss.on('connection', (ws, req) => {
    console.log(`New client connected from ${req.socket.remoteAddress}`);
    clients.add(ws);

    // Send current status to new client
    ws.send(JSON.stringify({
        type: 'connection_status',
        message: 'Connected to multi-device monitoring server',
        connectedClients: clients.size,
        timestamp: new Date().toISOString()
    }));

    // Broadcast new client count to all clients
    broadcast({
        type: 'client_count_update',
        count: clients.size,
        timestamp: new Date().toISOString()
    });

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);

            if (data.type === 'access_detected') {
                console.log('🚨 Access detected! Broadcasting to all devices...');
                // Broadcast the access alert to all connected clients
                broadcast({
                    type: 'access_alert',
                    message: 'UNAUTHORIZED ACCESS DETECTED!',
                    timestamp: new Date().toISOString(),
                    source: req.socket.remoteAddress
                });
            } else if (data.type === 'heartbeat') {
                // Handle heartbeat messages
                ws.send(JSON.stringify({
                    type: 'heartbeat_ack',
                    timestamp: new Date().toISOString()
                }));
            }
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        clients.delete(ws);

        // Broadcast updated client count
        broadcast({
            type: 'client_count_update',
            count: clients.size,
            timestamp: new Date().toISOString()
        });
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
        clients.delete(ws);
    });
});

// Function to broadcast messages to all connected clients
function broadcast(data) {
    const message = JSON.stringify(data);
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

// Cleanup inactive connections every 30 seconds
setInterval(() => {
    clients.forEach(client => {
        if (client.readyState !== WebSocket.OPEN) {
            clients.delete(client);
        }
    });

    if (clients.size > 0) {
        console.log(`Active connections: ${clients.size}`);
    }
}, 30000);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚨 Multi-device Child Safety Monitor Server running on port ${PORT}`);
    console.log(`📱 Open http://localhost:${PORT} to access the monitoring system`);
    console.log(`🌐 Server accessible from other devices on your network`);
});
