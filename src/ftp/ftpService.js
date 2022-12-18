const lineReader = require('line-reader');
const marcaService = require('../api/marca/marca.service')
const modeloService = require('../api/modelo/modelo.service')

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
          debugger;
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

async function readModelo () {
/*   Cod.Marca | Cod.Modelo | Nomb.Modelo 
013|001|ASIA MODELO
025|001|MOD.BAIC
013|002|CHEVROLET */


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
      await readMarca()
      await readModelo()
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

