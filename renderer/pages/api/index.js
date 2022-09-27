const { Client } = require('whatsapp-web.js');

export default function handler(req, res) {
  const client = new Client({});

  client.on('ready', () => {
    console.log('Client is ready!');
  });

  client.on('qr', qr => {
    res.status(200).json({ qr: qr })
  });
  async function click(){
    await client.initialize();
  }
  console.log("aaa");
  click();
}
