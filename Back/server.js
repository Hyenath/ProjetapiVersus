const mysql = require('mysql');
const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();
const cors = require('cors');
const port = 3000; // Le port sur lequel votre serveur écoutera
const IPaddress = "0.0.0.0";

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

const connection = mysql.createConnection({
  host: '192.168.64.243',
  user: 'site1',
  password: 'site1',
  database: 'personnage',
})

// Connexion à la base de données
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    throw err;
    }
    console.log('Connecté à la base de données MySQL');
});



app.use(cors());


// Route d'exemple
app.get('/', (req, res) => {
  connection.query('SELECT * FROM perso', (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'exécution de la requête :', err);
      res.status(500).send('Erreur lors de la requête SQL');
      return;
    }
  
    // Envoi des résultats en tant que réponse JSON
    res.json(results);
  });
});

app.post('/addUser', (req, res) => {

  const { nom, prenom } = req.body;

  if (!nom || !prenom) {
    return res.status(400).json({ message: 'nom et prenom requis' });

  }

  // Requête d'insertion
  const sql = 'INSERT INTO perso (nom, force, vitesse, defense, durabilité, intelligence) VALUES (?, ?, ?, ?, ?, ?)';

  // Exécute la requête
  connection.query(sql, [nom, prenom], (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'exécution de la requête d\'insertion :', err);
      res.status(500).send('Erreur lors de l\'insertion des données');
      return;
    }

    //je rajoute au json une cles success à true que j'utilise dans le front
    //cette clé me permetra de vérifier que l'api s'est bien déroulé
    req.body.success = true;
    res.json(req.body);
  });

 


  
});

// Démarrer le serveur
app.listen(port, IPaddress, () => {
  console.log(`Le serveur est en écoute sur le port ${port} et l'adresse ${IPaddress}`);
});
