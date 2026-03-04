// Importerer JWT-biblioteket til at verificere tokens
const jwt = require('jsonwebtoken');

// Middleware der beskytter routes
module.exports = (req, res, next) => {
  // Henter token fra Authorization-headeren
  const token = req.headers.authorization;

  // Hvis der ikke er noget token → afvis
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    // Verificerer token og udtrækker brugerens ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Lægger brugerens ID ind i request-objektet
    req.user = { id: decoded.id };

    // Går videre til næste funktion (controlleren)
    next();

  } catch {
    // Token er ugyldigt → afvis
    res.status(401).json({ error: 'Invalid token' });
  }
};
