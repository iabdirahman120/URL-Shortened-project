// Laver en tilfældig 6-tegns kode til short links
module.exports = () => {
  return Math.random().toString(36).substring(2, 8);
};
