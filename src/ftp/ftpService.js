const { last } = require('lodash');

exports.read = (path) => {
    
let Client = require('ssh2-sftp-client');
const config = {
    host: '143.198.233.238',
    port: '22',
    username: 'root',
    password: 'Autonueve2022'
}

async function main() {
    const client = new Client('upload-test');
    const dst = `src/ftp/${path}`;
    const src = path;
  
    try {
      await client.connect(config);
      client.on('download', info => {
      console.log(`Listener: Download ${info.source}`);
      });
      return await client.downloadDir(src, dst);
    } finally {
      client.end();
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

exports.list = async (path) => {
  
let Client = require('ssh2-sftp-client');
const config = {
    host: process.env.HOST,
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
        dates.push(file.accessTime);
      })
      return dates.length > 0 ? dates.sort().reverse()[0] : null;
    } finally {
      client.end();
    }



}

exports.familias = () => {

}

exports.productos = () => {

}

exports.getUpdatedData = async (path) => {

  let lastGlobalDate = 0;
  let lastLocalDate;

  setInterval( async () => {

    lastLocalDate = await this.list(path)
    if (lastLocalDate > lastGlobalDate) {
      console.log(`La date local es mayor a la global, la reemplazaremos`)
      lastGlobalDate = lastLocalDate
      this.read(path)
    } else {
      console.log(`La date local es menor a la global no hacemos nada`)
      console.log(`Global: ${lastGlobalDate} - Local:${lastLocalDate}`)
    }


  }, 10000)


}

exports.main  = () => {
  this.getUpdatedData('RECIBIR/FAMILIAS')
  this.getUpdatedData('RECIBIR/PRUEBAS')
  this.getUpdatedData('RECIBIR/PRODUCTOS')
}

