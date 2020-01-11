const electron = require('electron')
const remote = electron.remote
const { selectDirectory } = remote.require('./src/SelectDirectory')
const { ProcessList } = remote.require('./src/Processlist')


let input = document.getElementById('btnDirectory');
let dirInput = document.getElementById('dir-input');
let btnProcess = document.getElementById('buttom-process');
let status = document.getElementById('status');
let clientCod = document.getElementById('clientCod');

document.getElementById('fakeButtom').addEventListener('click', ()=>{
  selectDirectory(path =>{
    if(path.length){
      btnProcess.disabled = false;
    }else{
      btnProcess.disabled = true;
    }
    status.innerHTML = 'aguardando ação';
    dirInput.value = path
  })
})
btnProcess.addEventListener('click', ()=>{
  let client = {
    cod : clientCod.value,
    dir : dirInput.value
  }
  ProcessList(client, response =>{

    btnProcess.disabled = true;
    if(response){
      status.innerHTML = response;
    }

  })
})