const lineReader = require('line-reader');
const marcaService = require('../api/marca/marca.service')
const modeloService = require('../api/modelo/modelo.service')
const submodeloService = require('../api/submodelo/submodelo.service')
const listasubmodeloService = require('../api/listasubmodelo/listasubmodelo.service')
const productoService = require('../api/producto/producto.service')
const listaproductoService = require('../api/listaproducto/listaproducto.service')

//leer y meter a la carpeta

function cleanZeros (numbers) {
  const numbersToArray = numbers.toString().split("");
  let gotANumber = false;
  const cleanedNumber = numbersToArray.filter((number, key) => {
    
    if (gotANumber === false) {
      if (key === 0 && number !== '0') {
        gotANumber = true;
        return true;
      }
      if (number === '0') {
        if (numbersToArray[key+1] === '0'){ 
          return false
        } else {
          gotANumber = true;
          return false
        }
      }
    } else {
      return true;
    }

  })
  return cleanedNumber.join("")
  
}


async function readGeneCodi () {

  return new Promise((resolve, reject) => {
    try {
      console.log("reading genecodi...")
      let headers = undefined;
      let arrayDeObjetosGenerados = [];
       lineReader.eachLine('src/ftp/RECIBIR/PRUEBAS/GENECODI.txt', function(line, last) {        
          if (line.length > 1) {
            if (headers === undefined) {
              //seteando lo que son los "key" o la primera linea del txt  /  columnas 
              headers = line.split(' | ').map((element) => element.trim())
            } else {
              const currentLine = line.split('|')
              if (currentLine.length === headers.length) {
                let lineObject = {}
                currentLine.forEach((element, index) => {
                  lineObject[headers[index]] = element;
                })
                arrayDeObjetosGenerados.push(lineObject)
            }
          }
    
          }
    
          //Cod.Marca | Cod.Modelo | Cod.Submodelo | Nomb.Sub-Modelo 
          if(last) {
            if (arrayDeObjetosGenerados.length > 1) {
              arrayDeObjetosGenerados.forEach((objeto) => {
                
                const idMarca = cleanZeros(objeto['Marca'])
                const idModelo = cleanZeros(objeto['Modelo'])
                const idSubmodelo = cleanZeros(objeto['Submodelo'])
                const idAnoFab = cleanZeros(objeto['Anofab'])
                const idListaSubmodelo = `${idMarca}${idModelo}${idSubmodelo}${idAnoFab}`;
                const id = `${objeto['Codigo']}${idListaSubmodelo}`;
                const idProducto = objeto['Codigo']
                
                resolve(listaproductoService.insertOrUpdate(id, idProducto, idListaSubmodelo));
              })
              
            }
          }
        });
    
        
    } catch (err) {
      reject(err);
      console.log(err)
    }
    
  })
  

  }

async function readProducto () {

  return new Promise((resolve, reject) => {
    try {
      console.log("reading producto...")
      let headers = undefined;
      let arrayDeObjetosGenerados = [];
       lineReader.eachLine('src/ftp/RECIBIR/PRUEBAS/PRODUCTO.txt', function(line, last) {        
          if (line.length > 1) {
            if (headers === undefined) {
              //seteando lo que son los "key" o la primera linea del txt  /  columnas 
              headers = line.split(' | ').map((element) => element.trim())
            } else {
              const currentLine = line.split('|')
              if (currentLine.length === headers.length) {
                let lineObject = {}
                currentLine.forEach((element, index) => {
                  lineObject[headers[index]] = element;
                })
                arrayDeObjetosGenerados.push(lineObject)
            }
          }
    
          }
    
          //Cod.Marca | Cod.Modelo | Cod.Submodelo | Nomb.Sub-Modelo 
          if(last) {
            if (arrayDeObjetosGenerados.length > 1) {
              arrayDeObjetosGenerados.forEach((objeto) => {
                const id = objeto['Codigo'];
                const glosa = `${objeto['Glosa 1']} ${objeto['Glosa 2']} ${objeto['Glosa 3']} ${objeto['Glosa 4']} ${objeto['Glosa 5']} ${objeto['Glosa 6']} ${objeto['Glosa 7']} ${objeto['Glosa 8']} ${objeto['Glosa 9']} ${objeto['Glosa 10']} `
                resolve(productoService.insertOrUpdate(id, objeto['Descripcion'], objeto['Precio Vta.'], objeto['Stock'], objeto['Prec.Local'], glosa))
              })
              
            }
          }
        });
    
        
    } catch (err) {
      reject(err);
      console.log(err)
    }
    
  })
  

  }

async function readAnoFab () {

  return new Promise((resolve, reject) => {
    try {
      console.log("reading anofab..")
      let headers = undefined;
      let arrayDeObjetosGenerados = [];
       lineReader.eachLine('src/ftp/RECIBIR/PRUEBAS/ANOFAB.txt', function(line, last) {        
          if (line.length > 1) {
            if (headers === undefined) {
              //seteando lo que son los "key" o la primera linea del txt  /  columnas 
              headers = line.split(' | ').map((element) => element.trim())
            } else {
              const currentLine = line.split('|')
              if (currentLine.length === headers.length) {
                let lineObject = {}
                currentLine.forEach((element, index) => {
                  lineObject[headers[index]] = element;
                })
                arrayDeObjetosGenerados.push(lineObject)
            }
          }
    
          }
  
          //Cod.Marca | Cod.Modelo | Cod.Submodelo | Nomb.Sub-Modelo 
          if(last) {
            if (arrayDeObjetosGenerados.length > 1) {
              arrayDeObjetosGenerados.forEach((objeto) => {
                const idMarca = cleanZeros(objeto['Cod.Marca'])
                const idModelo = cleanZeros(objeto['Cod.Modelo'])
                const idSubmodelo = cleanZeros(objeto['Cod.Submodelo'])
                const idAno = cleanZeros(objeto['Ano'])
                const id = `${idMarca}${idModelo}${idSubmodelo}${idAno}`
                resolve(listasubmodeloService.insertOrUpdate(id, `${idMarca}${idModelo}${idSubmodelo}`, objeto['Nomb.Ano']))
              })
              
            }
          }
        });
    
        
    } catch (err) {
      reject(err);
      console.log(err)
    }
    
  })
  }

async function readSubmodelo () {

  return new Promise((resolve, reject) => {
    try {
      console.log("reading submodelo...")
      let headers = undefined;
      let arrayDeObjetosGenerados = [];
       lineReader.eachLine('src/ftp/RECIBIR/PRUEBAS/SUBMODELO.txt', function(line, last) {        
          if (line.length > 1) {
            if (headers === undefined) {
              //seteando lo que son los "key" o la primera linea del txt  /  columnas 
              headers = line.split(' | ').map((element) => element.trim())
            } else {
              const currentLine = line.split('|')
              if (currentLine.length === headers.length) {
                let lineObject = {}
                currentLine.forEach((element, index) => {
                  lineObject[headers[index]] = element;
                })
                arrayDeObjetosGenerados.push(lineObject)
            }
          }
    
          }
    
          //Cod.Marca | Cod.Modelo | Cod.Submodelo | Nomb.Sub-Modelo 
          if(last) {
            if (arrayDeObjetosGenerados.length > 1) {
              arrayDeObjetosGenerados.forEach((objeto) => {
                const idMarca = cleanZeros(objeto['Cod.Marca'])
                const idModelo = cleanZeros(objeto['Cod.Modelo'])
                const idSubmodelo = cleanZeros(objeto['Cod.Submodelo'])
                const id = `${idMarca}${idModelo}${idSubmodelo}`
                //marcaService.insertOrUpdate(objeto['Cod.Marca'], objeto['Nomb.Marca'])
                resolve(submodeloService.insertOrUpdate(id, `${idMarca}${idModelo}`, objeto['Nomb.Sub-Modelo']))
              })
              
            }
          }
        });
    
        
    } catch (err) {
      reject(err);
      console.log(err)
    }
    
  })
  

}

async function readModelo () {

return new Promise((resolve, reject) => {
  try {
    console.log("reading modelo...")
    let headers = undefined;
    let arrayDeObjetosGenerados = [];
     lineReader.eachLine('src/ftp/RECIBIR/PRUEBAS/MODELO.txt', function(line, last) {        
        if (line.length > 1) {
          if (headers === undefined) {
            //seteando lo que son los "key" o la primera linea del txt  /  columnas 
            headers = line.split(' | ').map((element) => element.trim())
          } else {
            const currentLine = line.split('|')
            if (currentLine.length === headers.length) {
              let lineObject = {}
              currentLine.forEach((element, index) => {
                lineObject[headers[index]] = element;
              })
              arrayDeObjetosGenerados.push(lineObject)
          }
        }

        }
        if(last) {
          if (arrayDeObjetosGenerados.length > 1) {
            arrayDeObjetosGenerados.forEach((objeto) => {
              const idMarca = cleanZeros(objeto['Cod.Marca'])
              const idModelo = cleanZeros(objeto['Cod.Modelo'])
              const id = `${idMarca}${idModelo}`
              resolve(modeloService.insertOrUpdate(id, objeto['Cod.Marca'], objeto['Nomb.Modelo']));
            })
            
          }
        }
      });

      
  } catch (err) {
    reject(err)
    console.log(err)
  }
})





}

async function readMarca () {
  return new Promise((resolve, reject) => {
    console.log("reading marca...")
    try {
      let headers = undefined;
      let arrayDeObjetosGenerados = [];
       lineReader.eachLine('src/ftp/RECIBIR/PRUEBAS/MARCA.txt', function(line, last) {        
          if (line.length > 1) {
            if (headers === undefined) {
              //seteando lo que son los "key" o la primera linea del txt  /  columnas 
              headers = line.split(' | ').map((element) => element.trim())
            } else {
              const currentLine = line.split('|')
              if (currentLine.length === headers.length) {
                let lineObject = {}
                currentLine.forEach((element, index) => {
                  lineObject[headers[index]] = element;
                })
                arrayDeObjetosGenerados.push(lineObject)
            }
          }
  
          }
          if(last) {
            if (arrayDeObjetosGenerados.length > 1) {
              arrayDeObjetosGenerados.forEach((objeto) => {
                resolve(marcaService.insertOrUpdate(objeto['Cod.Marca'], objeto['Nomb.Marca']))
              })
              
            }
          }
        });
  
        
    } catch (err) {
      reject(err);
      console.log(err)
    }
  })


}
//modified files lo estaba ocupando para traerme solo los modificados, y en base a eso leerlos en orden
//no tener que leer todos los archivos, quizas despues pueden ser muy grandes y si es cada 10 minutos capaz se toma 1 o 2 en solo cargar todo denuevo.
exports.read = (path, modifiedFiles) => {
    
let Client = require('ssh2-sftp-client');
const config = {
  host: process.env.FTP_HOST,
  port: process.env.FTP_PORT,
  username: process.env.FTP_USERNAME,
  password: process.env.FTP_PASSWORD
}



async function main() {
    const client = new Client('upload-test');
    const dst = `${process.env.FTP_FOLDER}${path}`;
    const src = path;

    try {
      await client.connect(config);
      client.on('download', info => {
      console.log(`Listener: Download ${info.source}`);
      });
      const downloadedFile = await client.downloadDir(src, dst);
      return downloadedFile
    } catch (err) {
      console.log(err);
    } finally {
      client.end();

/*         modifiedFiles.forEach(async (file) => { */
/*           if (file === 1) { */
            await readMarca()
/*           } else if (file === 2) { */
            await readModelo()
/*           } else if (file === 3) { */
            await readSubmodelo() 
/*           } else if (file === 4) { */
            await readAnoFab()
/*           } else if (file === 5) { */
            await readProducto()
/*           } else if (file === 6){ */
            await readGeneCodi()
/*           }
  
        }) */

        
    }

    

}

  main()
  .then(msg => {
    console.log(msg);
  })
  .catch(err => {
    console.log(`main error: ${err.message}`);
  });
}




//Ver tema hora
exports.list = async (path) => {
  
let Client = require('ssh2-sftp-client');
const config = {
  host: process.env.FTP_HOST,
  port: process.env.FTP_PORT,
  username: process.env.FTP_USERNAME,
  password: process.env.FTP_PASSWORD
}

    const client = new Client('read');  
    try {
      await client.connect(config);
      const dates = [];
      const datesArray = [];
      const data = await client.list(path);
      data.map((file) => {
        let object = {};
        const fileName = file.name.replace(".txt", "");

        //OJO que es esto lo que marca el orden en que se leerán los archivos, el sort solo se maneja bien del 1 al 9, con 2 digitos se confunde y pone al numero '22' de los segundos. Si es que se llegaran a añadir mas de 10 ficheros es probable que esto falle porque el fichero 11 va a ser el 1ero o 2ndo, y puede que haya que cargar los de entremedio para que este no tenga conflictos

        if  (fileName === 'MARCA') {
          object['file'] = 1;
        } else if (fileName === 'MODELO') {
          object['file'] = 2;
        } else if (fileName === 'SUBMODELO') {
          object['file'] = 3;
        } else if (fileName === 'ANOFAB') {
          object['file'] = 4;
        } else if (fileName === 'PRODUCTO') {
          object['file'] = 5;
        } else if (fileName === 'GENECODI') {
          object['file'] = 6;
        }

        object['modify_time'] = file.modifyTime

        datesArray.push(object);

        data.map((file) => {
          dates.push(file.modifyTime);
        })
      })
      if (dates.length > 0) {
        return {
          lastDate: dates.sort().reverse()[0],
          datesArray: datesArray.sort()
        }
      } else {
        return null;
      }
    } finally {
      client.end();
    }



}

exports.getUpdatedData = async (path, firstTime, lastDate) => {

  try {
  let lastGlobalDate = lastDate;


  if (firstTime) {

    let modifiedFiles = [];
    let reviewResponse;

    reviewResponse = await this.list(path)
  
    if (reviewResponse.datesArray.length > 0) {
      reviewResponse.datesArray.forEach((date) => {
        if (date.modify_time > lastGlobalDate) {
          modifiedFiles.push(date.file)
        } 
      })
    } 

 
    if (reviewResponse.lastDate > lastGlobalDate) {
      console.log(`La date local es mayor a la global, la reemplazaremos`)
      lastGlobalDate = reviewResponse.lastDate
      this.read(path, modifiedFiles)
    } else {
      console.log(`La date local es menor a la global no hacemos nada`)
      console.log(`Global: ${new Date(lastGlobalDate)} - Local:${new Date(reviewResponse.lastDate)}`)

    }

    return reviewResponse.lastDate
  } else {
    setInterval( async () => {
      let modifiedFiles = [];
      let reviewResponse;
      reviewResponse = await this.list(path)
  
      if (reviewResponse.datesArray.length > 0) {
        reviewResponse.datesArray.forEach((date) => {
          if (date.modify_time > lastGlobalDate) {
            modifiedFiles.push(date.file)
          } 
        })
      } 
  
   
      if (reviewResponse.lastDate > lastGlobalDate) {
        console.log(`La date local es mayor a la global, la reemplazaremos`)
        lastGlobalDate = reviewResponse.lastDate
        this.read(path, modifiedFiles)
      } else {
        console.log(`La date local es menor a la global no hacemos nada`)
        console.log(`Global: ${new Date(lastGlobalDate)} - Local:${new Date(reviewResponse.lastDate)}`)
  
      }
  
    }, 60000)

    return true;
  }

  } catch(err) {
    console.log(err);

  }

  


}

exports.main  = async () => {
  console.log("ejecutando main...")
  try {
    //La rutina se ejecuta automáticamente al iniciar el servidor
    //Luego comienza una rutina donde cada 1 minuto se verifica y actualiza
    console.log("ejecutando try...")
    const lastDate = await this.getUpdatedData('RECIBIR/PRUEBAS', true, 0)
    setTimeout(() => {
      console.log("ejecutando timeout...")
      this.getUpdatedData('RECIBIR/PRUEBAS', false, lastDate)
    }, 60000)

  } catch (err) {
    console.log(err)
  }
}

