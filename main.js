const path = require('path')
const url = require('url')
const fs = require('fs');

const { app, BrowserWindow, dialog } = require('electron')
const { api } = require('./services/api');
const copyFileSync = require('fs-copy-file-sync');
require('electron-reload')(__dirname);

let win
const iconPath = path.join(__dirname, "build", "icon.png");

function createWindow () {

  win = new BrowserWindow({
    width: 480,
    height: 300,
    maximizable : false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    },
    icon: iconPath
  })

  win.setMenu(null)
  win.loadFile('./view/index.html')
  //win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
exports.selectDirectory = (res)=>{
    dialog.showOpenDialog(win, {
      properties: ['openDirectory']
    }).then(result => {
        //console.log(result.canceled)
        //console.log(result.filePaths)
        res(result)

      }).catch(err => {
        //console.log(err)
      })
  }


exports.processList = async(client,cb) =>{
    const endPoint = 'select/selection';
    const clientId = client.cod;

    cb('iniciando...')

    await api.get(`${endPoint}/${clientId}`).then(async ({ data } ) =>{

      cb('recebendo dados...')

      const selecionadas = data.selected_pictures;
      const listImages = data.picturesMap;

      const arrImages = []

      const objSelect = Object.entries(selecionadas);
      const objListImages = Object.entries(listImages);

      await fs.mkdirSync(path.join(client.dir,'selecionadas'),{recursive: true});



      objListImages.forEach(([key,imgs]) =>{
        arrImages[imgs.id] = imgs
      })

      objSelect.forEach(([key,select]) =>{

        const { title, image } = arrImages[key];

        let fileName = image.split('/')
        filename = fileName[fileName.length - 1];

        if (fs.existsSync(path.join(client.dir,filename))){

          cb(`copiado ${filename}...`)
          copyFileSync(path.join(client.dir,filename), path.join(client.dir,'selecionadas',filename));
        }
        cb('completo!')

      })

    }).catch(error =>{
      cb('erro ao obter lista!')
    })
}