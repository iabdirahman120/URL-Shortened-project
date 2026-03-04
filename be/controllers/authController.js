//importerer nødvendige moduler
//bcrypt bruges til at hashe passwords, betyder at vi ikke gemmer brugerens password i klar tekst i databasen, hvilket øger sikkerheden.
const bcrypt = require('bcrypt');

//jsonwebtoken bruges til at generere og verificere JSON Web Tokens (JWT), som vi bruger til at autentificere brugere og beskytte vores API endpoints.
//token er digital nøgle, som beviser bruger er logget ind
const jwt = require('jsonwebtoken');

//userModel er vores model for brugere, som indeholder funktioner til at interagere 
// med users tabellen i databasen.
// Vi bruger disse funktioner til at oprette nye brugere og finde eksisterende brugere baseret på email eller id.
//usermodel snakker med database, ikke controler
const userModel = require('../models/userModel');


// Controller-funktion til at registrere en ny bruger
exports.register = (req, res) => {

  // Henter email og password fra request body (det brugeren har indtastet)
  const { email, password } = req.body;

  // Tjekker om der allerede findes en bruger med den email
  const existing = userModel.findByEmail(email);
  if (existing) return res.status(400).json({ error: 'Email already exists' });

  // Hasher passwordet med bcrypt (10 = styrken af hashingen)
  const hash = bcrypt.hashSync(password, 10);

  // Opretter brugeren i databasen med email + hashed password
  userModel.createUser(email, hash);

  // Sender svar tilbage til klienten
  res.json({ message: 'User created' });
};



// Controller-funktion til login
exports.login = (req, res) => {

  // Henter email og password fra request body
  const { email, password } = req.body;

  // Finder brugeren i databasen via email
  const user = userModel.findByEmail(email);

  // Hvis brugeren ikke findes → fejl
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });

  // Sammenligner det indtastede password med det hashed password i databasen
  const match = bcrypt.compareSync(password, user.password_hash);

  // Hvis passwordet ikke matcher → fejl
  if (!match) return res.status(400).json({ error: 'Invalid credentials' });

  // Opretter et JWT-token med brugerens id som payload
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  // Sender token tilbage til klienten, så den kan bruge det til beskyttede endpoints
  res.json({ token });
};
