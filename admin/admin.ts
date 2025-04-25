// Gestion de l'envoi du formulaire de mise à jour du profil
document.getElementById('profileForm')!.addEventListener('submit', (event) => {
  event.preventDefault();

  const updatedProfile = {
    name: (document.getElementById('name') as HTMLInputElement).value,
    title: (document.getElementById('title') as HTMLInputElement).value,
    bio: (document.getElementById('bio') as HTMLTextAreaElement).value,
  };

  // Envoi de la requête POST pour mettre à jour le profil
  fetch('https://portfolio-dynamique.onrender.com/api/admin/update-profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedProfile),
  })
  .then(response => response.json())
  .then(data => {
    alert('Profil mis à jour avec succès!');
  })
  .catch(error => console.error('Erreur lors de la mise à jour du profil:', error));
});
