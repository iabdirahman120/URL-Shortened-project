//hvad sker der her? Det er en model for brugere i vores database. 
// Den indeholder funktioner til at oprette en bruger, finde en bruger ved email og 
// finde en bruger ved id. Vi bruger SQLite (postgres) som database, og vi bruger prepared statements 
// for at undgå SQL injection.
const db = require('../db');

// Funktioner til at interagere med users tabellen i databasen
exports.createUser = (email, passwordHash) => {
    const stmt = db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)');
    return stmt.run(email, passwordHash);
};
//findByEmail og findById er funktioner der bruges til at hente en bruger fra databasen baseret på enten email eller id.
exports.findByEmail = (email) => {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email);
};

//findById er en funktion der bruges til at hente en bruger fra databasen baseret på id. Den tager et id som parameter og returnerer den tilsvarende bruger, hvis den findes.
exports.findById = (id) => {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id);
}