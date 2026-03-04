//Finder login-formen i HTML'en
const form = document.getElementById('loginForm');

//Lytter efter submit-event på formen
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Forhindrer siden i at genindlæse ved submit

    //Henter værdier fra inputfelterne
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    //Sender en POST-request til /api/login med email og password
    const res = await api('/login', 'POST', { email, password });

    //Hvis login var succesfuldt, gem token i localStorage og redirect til dashboard
    if (res.token) {
        localStorage.setItem('token', res.token);
        window.location.href = '/dashboard.html';
    } else {
        //Hvis login fejlede, vis en fejlmeddelelse
        alert(res.error || 'Login failed');
    }
});