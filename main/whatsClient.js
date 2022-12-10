const { ipcMain } = require('electron');
const { Client , LocalAuth } = require('whatsapp-web.js');
const localChrome = require('local-chrome');
const sist = process.platform;
let chromeRoute;

if(sist === "linux"){
  if(localChrome){
    chromeRoute = localChrome;
  }else {
    chromeRoute = null;
  }
}else {
  if(localChrome){
    chromeRoute = localChrome;
  }else {
    chromeRoute = "resources\\app.asar.unpacked\\node_modules\\puppeteer\\.local-chromium\\win64-982053\\chrome-win\\chrome.exe";
  }
}
const client = new Client({
  authStrategy: new LocalAuth({clientId: "client-Chrome",dataPath:"./"}),
  puppeteer: {
    //headless: false,
    executablePath: chromeRoute,
  }
});

let isInit = false;
let frameEvent;
let createingScript = false;
let scriptId;

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
  if (comand === "logOut") {
    await client.logout();
  }

  if(comand === "send"){
    const message = data.message;
    const script = data.script;
    const number = await client.getNumberId(data.number);

    await client.sendMessage(number._serialized,message);

    if(script){
      const id = script.value;
      const chat = await client.getChatById(id);
      const messages = await chat.fetchMessages({limit:100});
      for (let i = 0; i < messages.length; i++) {
        await messages[i].forward(number._serialized);
      }
    }
  }

  if(comand === "createScript"){
    const name = data.name;
    const myWid = client.info.wid._serialized;
    const resp = await client.createGroup(name,[myWid]);
    createingScript = true;
    scriptId = resp.gid._serialized;
  }
  if(comand === "getScripts"){
    const chats = await client.getChats();

    const scriptsList = [];

    for (let i = 0; i < chats.length; i++) {
      const chat = chats[i];
      if(chat.name.includes("ROTEIRO:")){
        scriptsList.push({
          label:chat.name.replace("ROTEIRO:",""),
          value:chat.id._serialized
        })
      }
    }

    event.sender.send("comandChannel",scriptsList);
  }
  if(comand === "deleteScript"){
    console.log(data.id);
    const id = data.id;
    const chat = await client.getChatById(id);
    if(await chat.delete()){
      event.sender.send("responseChannel", {
        code:"scriptDeleted"
      });
    }
  }
  if(comand === "sendScriptMessages"){
    console.log(data.id);
    const id = data.id.value;
    const chat = await client.getChatById(id);
    const messages = await chat.fetchMessages({limit:100});
    await client.sendMessage('555180500305@c.us',{});
    for (let i = 0; i < messages.length; i++) {
      await messages[i].forward('555180500305@c.us');
    }
    event.sender.send("comandChannel",messages);
  }

  if(comand === "getContacts"){
    const chats = await client.getContacts();
    const chatResp = [];
    console.log(chats);
    for (let i = 0; i < chats.length; i++) {
      const chat = chats[i];
      if(chat.isUser){
        if(!chat.name){
          chat.name = chat.number;
        }
        chatResp.push(chat);
      }
    }
    event.sender.send("comandChannel",chatResp);
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
  frameEvent.sender.send("responseChannel", {code:"loading",data:{percent,message}});
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


client.on('group_update', async (notification) => {
  if (createingScript && scriptId === notification.chatId) {
    await client.archiveChat(notification.chatId);
    createingScript = false;
    scriptId = null;
    frameEvent.sender.send("responseChannel", {
      code:"scriptCreated",
      data:{
        scriptId: notification.chatId,
        name:notification.body
      }
    });
  }
});





