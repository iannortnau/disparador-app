const { ipcMain } = require('electron');
const { dialog } = require('electron')

let frameEvent;
//Controle de comandos
ipcMain.on("fileChannel", async (event, args) => {
  frameEvent = event;
  const comand = args.comand;
  const data = args.data;

  console.log(comand);

  if(comand === "imageSearch"){
    let route = dialog.showSaveDialogSync({
      properties: ["openFile"],
      filters: [{ name: 'Images', extensions: ['jpg', 'png'] }]
    });

    if(route !== undefined){
      event.sender.send("fileChannel",route);
    }
  }

  if(comand === "videoSearch"){
    let route = dialog.showSaveDialogSync({
      properties: ["openFile"],
      filters: [{ name: 'Videos', extensions: ["mp4", "avi", "mkv", "mov", "flv", "3gp"] }]
    });

    if(route !== undefined){
      event.sender.send("fileChannel",route);
    }
  }

  if(comand === "audioSearch"){
    let route = dialog.showSaveDialogSync({
      properties: ["openFile"],
      filters: [{ name: 'Áudios', extensions: ["mp3", "ogg", "opus"] }]
    });

    if(route !== undefined){
      event.sender.send("fileChannel",route);
    }
  }
});






