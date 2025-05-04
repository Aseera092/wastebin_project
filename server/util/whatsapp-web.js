const { Client, LocalAuth } = require('whatsapp-web.js');
const { machinFullNotification } = require('../controller/machineController');

// Create a new WhatsApp client
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
    }
});

// // Generate QR code for authentication
client.on('qr', (qr) => {
    // qrcode.generate(qr, { small: true });
    console.log('QR Code generated. Scan it using your WhatsApp app.');
});

// Handle client ready state
client.on('ready', () => {
    console.log('Client is ready!');
    machinFullNotification(client);
});

// Handle authentication errors
client.on('auth_failure', (error) => {
    console.error('Authentication failed:', error);
});

// Initialize the client
client.initialize();

module.exports = client;