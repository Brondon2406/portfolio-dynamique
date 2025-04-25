const loginForm = document.getElementById('loginForm') as HTMLFormElement;
const updateProfileForm = document.getElementById('updateProfileForm') as HTMLFormElement;
const profileUpdateSection = document.getElementById('profileUpdateSection') as HTMLElement;

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    
    fetch('https://portfolio-dynamique.onrender.com/api/admin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('adminToken', data.token);
            loginForm.style.display = 'none';
            profileUpdateSection.style.display = 'block';
        } else {
            alert('Identifiants invalides');
        }
    })
    .catch(error => console.error('Erreur de connexion:', error));
});

updateProfileForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const bioText = (document.getElementById('bioText') as HTMLTextAreaElement).value;
    
    fetch('https://portfolio-dynamique.onrender.com/api/admin/update-profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ basics: { bio: bioText } })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Profil mis à jour');
        }
    })
    .catch(error => console.error('Erreur de mise à jour du profil:', error));
});
