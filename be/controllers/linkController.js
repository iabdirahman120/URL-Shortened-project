// Importerer link-modellen, som håndterer alle databasekald for links
const linkModel = require('../models/linkModel');

// Importerer funktionen der genererer en tilfældig short code
const generateCode = require('../utils/generateCode');


// Controller til at oprette et nyt kort link
exports.createLink = (req, res) => {
  // Henter URL'en fra request body
  const { url } = req.body;

  // Genererer en unik 6-tegns kode til det korte link
  const code = generateCode();

  // Opretter linket i databasen med brugerens ID, original URL og short code
  linkModel.createLink(req.user.id, url, code);

  // Sender short code tilbage til klienten
  res.json({ short: code });
};


// Controller til at hente alle links for den aktuelle bruger
exports.getLinks = (req, res) => {
  // Henter alle links der tilhører brugeren (req.user.id kommer fra auth middleware)
  const links = linkModel.getLinksByUser(req.user.id);

  // Sender listen af links tilbage
  res.json(links);
};


// Controller til at slette et link
exports.deleteLink = (req, res) => {
  // Sletter linket med det givne ID, men kun hvis det tilhører brugeren
  linkModel.deleteLink(req.params.id, req.user.id);

  // Sender bekræftelse tilbage
  res.json({ message: 'Deleted' });
};


// Controller til redirect + klik-tracking
exports.redirect = (req, res) => {
  // Finder linket i databasen ud fra short code i URL'en
  const link = linkModel.findByCode(req.params.code);

  // Hvis linket ikke findes → 404
  if (!link) return res.status(404).send('Not found');

  // Øger klik-tælleren for linket
  linkModel.incrementClick(link.id);

  // Redirecter brugeren til den originale URL
  res.redirect(link.original_url);
};
