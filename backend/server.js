const http = require('http');
const app = require('./app');
const config = require('./config');

// Fonction pour normaliser le port
const normalizePort = val => {
  const port = parseInt(val, 10); // Convertit la chaîne de caractères en nombre

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) { // Si le port est un nombre positif
    return port;
  }
  return false;
};
const port = normalizePort(config.MY_PORT || '3000'); // Récupère le port du fichier de configuration
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') { // Si l'erreur n'est pas liée au serveur
    throw error; 
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port; // Si le port est un nombre, on affiche le port, sinon on affiche le chemin du pipe
  switch (error.code) {
    case 'EACCES': // Nécessite des privilèges d'administrateur
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE': // Si le port est déjà utilisé par un autre processus
      console.error(bind + ' is already in use.');
      process.exit(1);
      break; 
    default:
      throw error;
  }
};

const server = http.createServer(app);

// Gestion des évènements d'erreur et de mise en écoute du serveur
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);
