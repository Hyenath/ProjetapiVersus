// Importez le module Express
const express = require('express');

const bodyParser = require('body-parser');

// Créez une instance d'Express
const app = express(); 

//middleware 
app.use(bodyParser.json()); // décode le body d'une requête


app.post('/', (req, res) => {
  const donneesDuCorps = req.body;
  console.log("coucou");
  console.log(donneesDuCorps);
  res.send('Données reçues et traitées !');
});

// Définissez une route simple
app.get('/', (req, res) => {
  res.send('Hello, World!');
});  


// Démarrez le serveur sur le port 3000
const port = 8080;
app.listen(port, () => {
  console.log(`Le serveur est en cours d'écoute sur le port ${port}`);
});

// Gestionnaire d'erreurs global
process.on('uncaughtException', (err) => {
    console.error(`Une erreur non capturée s'est produite : ${err.message}`);
    process.exit(1); // 1 signifie une sortie avec une erreur
});  