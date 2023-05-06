const fs = require('fs');

function logError(err) {
  const errorMessage = `${new Date().toISOString()} - ${err.stack}\n`;

  fs.appendFile('logs.txt', errorMessage, (error) => {
    if (error) console.error('Error al escribir en el archivo de registro:', error);
  });

  // opcionalmente, envía una respuesta de error al usuario
  response.status(500).json({ error: 'Ocurrió un error en el servidor' });
}

module.exports = { logError };