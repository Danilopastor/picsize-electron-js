const { dialog } = require('electron')
let { win } = require('../main')

exports.selectDirectory = ( callback ) =>{
    dialog.showOpenDialog(win, {
      properties: ['openDirectory']
    }).then(result => {
        //console.log(result.canceled)
        //console.log(result.filePaths)
        callback(result.filePaths)

      }).catch(err => {
        //console.log(err)
      })
  }