const db = require('../db');

// Funktioner til at interagere med links tabellen i databasen
exports.createLink = (userId, originalUrl, shortCode) => {
    const stmt = db.prepare('INSERT INTO links (user_id, original_url, short_code) VALUES (?, ?, ?)');
    return stmt.run(userId, originalUrl, shortCode);
};

//getLinksByUser er en funktion der bruges til at hente alle links for en bestemt bruger.
//  Den tager et userId som parameter og returnerer en liste over links, der tilhører den bruger.
exports.getLinksByUser = (userId) => {
    const stmt = db.prepare('SELECT * FROM links WHERE user_id = ?');
    return stmt.all(userId);
}

//deleteLink er en funktion der bruges til at slette et link fra databasen. 
// Den tager et id og userId som parametre og sletter det link, der matcher både id og userId, 
// hvilket sikrer at brugeren kun kan slette sine egne links.
exports.deleteLink = (id, userId) => {
    const stmt = db.prepare('DELETE FROM links WHERE id = ? AND user_id = ?');
    return stmt.run(id, userId);
};

//findByCode er en funktion der bruges til at hente et link fra databasen baseret på dets short code.
//  Den tager en short code som parameter og returnerer det tilsvarende link, hvis det findes.
exports.findByCode = (code) => {
    const stmt = db.prepare('SELECT * FROM links WHERE short_code = ?');
    return stmt.get(code);
};

//incrementClicks er en funktion der bruges til at øge antallet af klik for et link. Den tager et id som parameter og opdaterer det tilsvarende link i databasen ved at øge clicks med 1.
exports.incrementClicks = (id) => {
    const stmt = db.prepare('UPDATE links SET clicks = clicks + 1 WHERE id = ?');
    return stmt.run(id);
};