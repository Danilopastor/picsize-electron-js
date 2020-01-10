const electron = require('electron')
const remote = electron.remote
const mainProcess = remote.require('./main')

export const browserDir = paths =>{
    mainProcess.selectDirectory(result =>{
        paths(result.filePaths)
    })
  }
export const ProcessList = (client, cb) =>{

    mainProcess.processList(client, response => {
        cb(response)
    })
}