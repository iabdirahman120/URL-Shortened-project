// Basis-URL til backend
const API_URL = 'http://localhost:3000/api';

// Funktion til at sende requests med token
async function api(endpoint, method = 'GET', data = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      // Henter token fra localStorage
      'Authorization': localStorage.getItem('token')
    }
  };

  // Hvis der er data, send det som JSON
  if (data) {
    options.body = JSON.stringify(data);
  }

  // Sender request til backend
  const res = await fetch(`${API_URL}${endpoint}`, options);

  // Returnerer JSON-svar
  return res.json();
}
