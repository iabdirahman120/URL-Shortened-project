// Finder formularen i HTML'en via dens id
const form = document.getElementById('registerForm');

// Lytter efter når brugeren trykker "submit" på formularen
form.addEventListener('submit', async (e) => {

    // Stopper browseren fra at genindlæse siden (standard opførsel ved submit)
    e.preventDefault();

    // Henter værdierne fra inputfelterne
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Sender data til backend via vores api()-funktion
    // POST /register med email og password
    const res = await api('/register', 'POST', { email, password });

    // Hvis backend svarer med "message", betyder det at registreringen lykkedes
    if (res.message) {
        alert('Registration successful! Please log in.');

        // Sender brugeren videre til login-siden
        window.location.href = '/login.html';
    } else {
        // Hvis noget gik galt, vis fejlbesked
        alert(res.error || 'Registration failed');
    }
});
