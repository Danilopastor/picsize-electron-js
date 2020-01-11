const path = require('path')
const { app, BrowserWindow, dialog } = require('electron')
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

exports.win