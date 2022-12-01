const { ipcMain } = require('electron');
const { dialog } = require('electron')

let frameEvent;
//Controle de comandos
ipcMain.on("fileChannel", async (event, args) => {
  frameEvent = event;
  const comand = args.comand;
  const data = args.data;

  if(comand === "imageSearch"){
    let imageRoute = dialog.showSaveDialogSync({
      properties: ["openFile"],
      filters: [{ name: 'Images', extensions: ['jpg', 'png'] }]
    });

    if(imageRoute !== undefined){
      event.sender.send("fileChannel",imageRoute);
    }
  }
});






