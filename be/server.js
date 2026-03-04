//importer express app fra app.js
const app = require('./app');   
//sætter hvilken port serveren skal lytte på, enten fra miljøvariabler eller default til 3000
const PORT = process.env.PORT || 3000;

// Starts the http server og lytter ved valgte port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});