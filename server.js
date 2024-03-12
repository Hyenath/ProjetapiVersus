const mysql = require('mysql');
const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const bcrypt = require('bcrypt');
const util = require('util');

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
  host: '192.168.64.194',
  user: 'rachid',
  password: 'arabe',
  database: 'personnage',
});

// Promisify query method to use async/await
const query = util.promisify(connection.query).bind(connection);

// Connexion à la base de données MySQL
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données MySQL:', err);
    process.exit(1); // Quitte l'application en cas d'erreur de connexion
  }
  console.log('Connecté à la base de données MySQL');
});

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
    if (!passwordMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }
    res.json({ message: "Connexion réussie." });
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res.status(500).json({ message: "Erreur lors de la connexion." });
  }
});

// Démarrer le serveur
app.listen(port, IPaddress, () => {
  console.log(`Le serveur est en écoute sur le port ${port} et l'adresse ${IPaddress}`);
});