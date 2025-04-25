// Appel à l'API pour récupérer les données du profil
fetch('https://portfolio-dynamique.onrender.com/api/profile')
  .then(res => res.json())
  .then(data => {
    // Mise à jour du nom et du titre
    document.getElementById('name')!.textContent = data.name;
    document.getElementById('title')!.textContent = data.title;

    // Récupération de la liste des projets
    const projects = document.getElementById('projects')!;
    data.projects.forEach((project: any) => {
      const div = document.createElement('div');
      div.classList.add('project');
      div.innerHTML = `
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <a href="${project.github}" target="_blank">Voir sur GitHub</a>
      `;
      projects.appendChild(div);
    });
  })
  .catch(error => console.error('Error fetching data:', error));
