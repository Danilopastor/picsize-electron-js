const path = require('path')
const fs = require('fs');
const copyFileSync = require('fs-copy-file-sync');

const { api } = require('../services/api');

exports.ProcessList = async(client,callback) =>{
    const endPoint = 'select/selection';
    const clientId = client.cod;
    let movedFiles = 0;

    callback('iniciando...')

    await api.get(`${endPoint}/${clientId}`).then(async ({ data } ) =>{


      callback('recebendo dados...')

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

          callback(`copiado ${filename}...`)
          copyFileSync(path.join(client.dir,filename), path.join(client.dir,'selecionadas',filename));

          movedFiles++
        }else if(fs.existsSync(path.join(client.dir,title))){

          callback(`copiado ${title}...`)
          copyFileSync(path.join(client.dir,title), path.join(client.dir,'selecionadas',title));

          movedFiles++

        }

      })
      callback(`${movedFiles} - arquivos encontrados!`)

    }).catch(error =>{
      callback('erro ao obter lista!')
    })
}