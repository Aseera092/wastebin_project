var express = require('express');
const client = require('../util/whatsapp-web');
const { updateSettings, getSettings } = require('../controller/settings');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/send-message', async (req, res) => {
    const { number, message } = req.query;

    if (!number || !message) {
        return res.status(400).json({ error: 'Number and message are required' });
    }

    try {
        const chatId = `${ number }@c.us`;
        const response = await client.sendMessage(chatId, message);
        console.log('Message sent:', response);
        res.status(200).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
}
);
router.get('/qr-code', (req, res) => {
  if(client.info){
    return res.status(200).json(
      { 
        status:false,
        message: 'Client is already authenticated',
        client: client.info
      }
    );
  }
    // Generate QR code for authentication
    client.on('qr', (qr) => {
        res.status(200).json(
          { 
            status:true,
            message: 'QR code generated',
            data: qr
          });
    });
});

router.get('/whatsapp-status', (req, res) => {
  if(client.info){
    return res.status(200).json(
      { 
        status:true,
        message: 'Client is already authenticated',
        client: client.info
      }
    );
  }

  res.status(200).json({ status: false, message: 'Client is not authenticated' });
}
);
router.put('/update-settings', updateSettings);
router.get('/get-settings', getSettings);

module.exports = router;
