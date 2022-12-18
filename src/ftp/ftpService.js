const lineReader = require('line-reader');
const marcaService = require('../api/marca/marca.service')
const modeloService = require('../api/modelo/modelo.service')
const submodeloService = require('../api/submodelo/submodelo.service')
const listasubmodeloService = require('../api/listasubmodelo/listasubmodelo.service')
const productoService = require('../api/producto/producto.service')
const listaproductoService = require('../api/listaproducto/listaproducto.service')

//leer y meter a la carpeta
exports.read = (path) => {
    
let Client = require('ssh2-sftp-client');
const config = {
  host: process.env.FTP_HOST,
  port: process.env.FTP_PORT,
  username: process.env.FTP_USERNAME,
  password: process.env.FTP_PASSWORD
}

function cleanZeros (numbers) {
  const numbersToArray = numbers.toString().split("");
  let gotANumber = false;
  const cleanedNumber = numbersToArray.filter((number, key) => {
    
    if (gotANumber === false) {
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
    debugger;

  })
  return cleanedNumber.join("")
  
}

async function readGeneCodi () {
  
  console.log("reading...")
  try {
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
              console.log(currentLine)
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
            console.log(arrayDeObjetosGenerados)
            arrayDeObjetosGenerados.forEach((objeto) => {
              
              const idMarca = cleanZeros(objeto['Marca'])
              const idModelo = cleanZeros(objeto['Modelo'])
              const idSubmodelo = cleanZeros(objeto['Submodelo'])
              const idAnoFab = cleanZeros(objeto['Anofab'])
              const idListaSubmodelo = `${idMarca}${idModelo}${idSubmodelo}${idAnoFab}`;
              const id = `${objeto['Codigo']}${idListaSubmodelo}`;
              const idProducto = objeto['Codigo']
              
              //marcaService.insertOrUpdate(objeto['Cod.Marca'], objeto['Nomb.Marca'])
              listaproductoService.insertOrUpdate(id, idProducto, idListaSubmodelo);

              console.log("ok")
            })
            
          }
        }
      });
  
      
  } catch (err) {
    console.log(err)
  }
  
  }

async function readProducto () {
  
  console.log("reading...")
  try {
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
              console.log(currentLine)
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
            console.log(arrayDeObjetosGenerados)
            arrayDeObjetosGenerados.forEach((objeto) => {
              const id = objeto['Codigo'];
              const glosa = `${objeto['Glosa 1']} ${objeto['Glosa 2']} ${objeto['Glosa 3']} ${objeto['Glosa 4']} ${objeto['Glosa 5']} ${objeto['Glosa 6']} ${objeto['Glosa 7']} ${objeto['Glosa 8']} ${objeto['Glosa 9']} ${objeto['Glosa 10']} `
              console.log(id)
              //marcaService.insertOrUpdate(objeto['Cod.Marca'], objeto['Nomb.Marca'])
              productoService.insertOrUpdate(id, objeto['Descripcion'], objeto['Precio Vta.'], objeto['Stock'], objeto['Prec.Local'], glosa)

              console.log("ok")
            })
            
          }
        }
      });
  
      
  } catch (err) {
    console.log(err)
  }
  
  }

async function readAnoFab () {
  
  console.log("reading...")
  try {
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
              console.log(currentLine)
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
            console.log(arrayDeObjetosGenerados)
            arrayDeObjetosGenerados.forEach((objeto) => {
              const idMarca = cleanZeros(objeto['Cod.Marca'])
              const idModelo = cleanZeros(objeto['Cod.Modelo'])
              const idSubmodelo = cleanZeros(objeto['Cod.Submodelo'])
              const idAno = cleanZeros(objeto['Ano'])
              const id = `${idMarca}${idModelo}${idSubmodelo}${idAno}`
              console.log(id)
              //marcaService.insertOrUpdate(objeto['Cod.Marca'], objeto['Nomb.Marca'])
              listasubmodeloService.insertOrUpdate(id, `${idMarca}${idModelo}${idSubmodelo}`, objeto['Nomb.Ano'])
              console.log("ok")
            })
            
          }
        }
      });
  
      
  } catch (err) {
    console.log(err)
  }
  
  }

async function readSubmodelo () {
  
console.log("reading...")
try {
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
            console.log(currentLine)
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
          console.log(arrayDeObjetosGenerados)
          arrayDeObjetosGenerados.forEach((objeto) => {
            const idMarca = cleanZeros(objeto['Cod.Marca'])
            const idModelo = cleanZeros(objeto['Cod.Modelo'])
            const idSubmodelo = cleanZeros(objeto['Cod.Submodelo'])
            const id = `${idMarca}${idModelo}${idSubmodelo}`
            console.log(id)
            //marcaService.insertOrUpdate(objeto['Cod.Marca'], objeto['Nomb.Marca'])
            submodeloService.insertOrUpdate(id, `${idMarca}${idModelo}`, objeto['Nomb.Sub-Modelo'])
            console.log("ok")
          })
          
        }
      }
    });

    
} catch (err) {
  console.log(err)
}

}

async function readModelo () {

console.log("reading...")
  try {
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
              console.log(currentLine)
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
            console.log(arrayDeObjetosGenerados)
            arrayDeObjetosGenerados.forEach((objeto) => {
              const idMarca = cleanZeros(objeto['Cod.Marca'])
              const idModelo = cleanZeros(objeto['Cod.Modelo'])
              const id = `${idMarca}${idModelo}`
              console.log(id)
              //marcaService.insertOrUpdate(objeto['Cod.Marca'], objeto['Nomb.Marca'])
              modeloService.insertOrUpdate(id, objeto['Cod.Marca'], objeto['Nomb.Modelo'])
              console.log("ok")
            })
            
          }
        }
      });

      
  } catch (err) {
    console.log(err)
  }


}

async function readMarca () {
  console.log("reading...")
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
              console.log(currentLine)
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
            console.log(arrayDeObjetosGenerados)
            arrayDeObjetosGenerados.forEach((objeto) => {
              marcaService.insertOrUpdate(objeto['Cod.Marca'], objeto['Nomb.Marca'])
              console.log("ok")
            })
            
          }
        }
      });

      
  } catch (err) {
    console.log(err)
  }

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
      throw err;
    } finally {
      client.end();
/*       await readMarca()
      await readModelo() */
      //me faltan datos que entren, da error pq faltan modelos para asociar
/*       await readSubmodelo() 
      await readAnoFab() */
      await readProducto()
      readGeneCodi()
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
      const data = await client.list(path);
      data.map((file) => {
        dates.push(file.modifyTime);
      })
      return dates.length > 0 ? dates.sort().reverse() : null;
    } finally {
      client.end();
    }



}

exports.getUpdatedData = async (path) => {

  try {

  let lastGlobalDate = 0;
  let lastLocalDate;

  setInterval( async () => {

    lastLocalDate = await this.list(path)

    let isHigherTime = true;


    lastLocalDate.forEach((date) => {
      if (date > lastGlobalDate) {
        isHigherTime = false;
      } 
    })

    if (isHigherTime === true) {
      console.log(`La date local es menor a la global no hacemos nada`)
      console.log(`Global: ${new Date(lastGlobalDate)} - Local:${new Date(Math.max(...lastLocalDate))}`)

    } else {
      console.log(`La date local es mayor a la global, la reemplazaremos`)
      lastGlobalDate = Math.max(...lastLocalDate)
      this.read(path)
    }




  }, 10000)

  } catch(err) {
    console.log(err);
    throw err;
  }

  


}

exports.main  = () => {
  try {
    this.getUpdatedData('RECIBIR/PRUEBAS')
  } catch (err) {
    console.log(err)
  }
}

