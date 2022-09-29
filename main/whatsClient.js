const { ipcMain } = require('electron');
const { Client , LocalAuth } = require('whatsapp-web.js');
const client = new Client({
  authStrategy: new LocalAuth({clientId: "client-one"}),
  //puppeteer: { headless: false }
});

let isInit = false;
let frameEvent;

//Controle de comandos
ipcMain.on("comandChannel", async (event, args) => {
  frameEvent = event;
  const comand = args.comand;
  const data = args.data;

  if (comand === "start") {
    if (isInit) {
      await client.destroy();
      await client.initialize();
    }else {
      await client.initialize();
    }
  }
  if (comand === "destroy") {
    await client.destroy();
  }
  if(comand === "send"){
    const message = data.message;
    const number = data.number;
    await client.sendMessage(number+"@c.us",message);
  }

});

//Controle de eventos do whats
client.on('qr', (qr) => {
  if(frameEvent !== null){
    frameEvent.sender.send("responseChannel", {code:"qrcode",data:qr});
  }
});

client.on('loading_screen', (percent, message) => {
  console.log('LOADING SCREEN', percent, message);
});

client.on('authenticated', () => {
  console.log("Authenticated");
  frameEvent.sender.send("responseChannel", {code:"authenticated"});
});

client.on('ready', () => {
  console.log('Client is ready!');
  frameEvent.sender.send("responseChannel", {code:"ready"});
});

client.on('auth_failure', msg => {
  console.log('Authenticated Error');
  frameEvent.sender.send("responseChannel", {code:"authenticatedError"});
});

client.on('disconnected', (reason) => {
  console.log('Client was logged out', reason);
  frameEvent.sender.send("responseChannel", {code:"loggedOut"});
});




