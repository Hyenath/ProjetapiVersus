const mysql = require('mysql');
const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const bcrypt = require('bcrypt');
const util = require('util');
const jwt = require('jsonwebtoken'); // Ajout du module jsonwebtoken

const app = express();
const port = 3000; // Le port sur lequel votre serveur écoutera
const IPaddress = "0.0.0.0";

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

const connection = mysql.createConnection({
  host: '192.168.64.243',
  user: 'Baseprinc',
  password: 'Baseeehehe',
  database: 'Api',
});

// Promisify query method to use async/await
const query = util.promisify(connection.query).bind(connection);

// Middleware pour vérifier l'authentification
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Token non fourni' });
  }

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token invalide' });
    }
    req.user = decoded;
    next();
  });
}

// Route d'exemple
app.get('/', async (req, res) => {
  try {
    const results = await query('SELECT * FROM perso');
    res.json(results);
  } catch (err) {
    console.error('Erreur lors de l\'exécution de la requête MySQL:', err);
    res.status(500).send('Erreur lors de la requête SQL');
  }
});

// Inscription
app.post("/register", async (req, res) => {
  console.log("execution du register")
  const { email, password } = req.body;
  try {
    const existingUser = await query('SELECT * FROM user WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "L'utilisateur existe déjà." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await query('INSERT INTO user (email, password) VALUES (?, ?)', [email, hashedPassword]);
    res.status(201).json({ message: "Succès de l'enregistrement utilisateur." });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    res.status(500).json({ message: "Erreur lors de l'enregistrement utilisateur." });
  }
});

// Connexion
app.post('/login', async (req, res) => {
  console.log("execution du login")
  const { email, password } = req.body;
  try {
    const users = await query('SELECT * FROM user WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ message: "L'utilisateur n'existe pas." });
    }
    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("décryptage du MDP")
    if (!passwordMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }
    // Si les informations d'identification sont correctes, générez un token JWT
    const token = jwt.sign({ email: user.email }, 'your_secret_key', { expiresIn: '1h' });
    console.log("token généré")
    // Renvoyer le token JWT dans la réponse
    res.json({ token });
    console.log("réponse du token")
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res.status(500).json({ message: "Erreur lors de la connexion." });
  }
});

// Route protégée nécessitant une authentification
app.get('/protectedRoute', verifyToken, (req, res) => {
  res.json({ message: 'Vous avez accès à cette ressource' });
});

// Démarrer le serveur
app.listen(port, IPaddress, () => {
  console.log(`Le serveur est en écoute sur le port ${port} et l'adresse ${IPaddress}`);
});