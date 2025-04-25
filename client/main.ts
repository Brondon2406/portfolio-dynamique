fetch('https://portfolio-dynamique.onrender.com/api/profile')
    .then(response => response.json())
    .then(data => {
        const bioElement = document.getElementById('bioContent');
        bioElement.innerHTML = `${data.basics.name} - ${data.basics.title}<br>${data.basics.bio}`;
        
        const skillsList = document.getElementById('skillsList');
        data.skills.forEach((skillCategory: any) => {
            const category = document.createElement('li');
            category.textContent = skillCategory.category;
            const items = document.createElement('ul');
            skillCategory.items.forEach((item: string) => {
                const skill = document.createElement('li');
                skill.textContent = item;
                items.appendChild(skill);
            });
            category.appendChild(items);
            skillsList.appendChild(category);
        });
        
        const projectsList = document.getElementById('projectsList');
        data.projects.forEach((project: any) => {
            const projectDiv = document.createElement('div');
            projectDiv.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.link}">Voir sur GitHub</a>
            `;
            projectsList.appendChild(projectDiv);
        });
    })
    .catch(error => console.error('Erreur lors de la récupération des données:', error));
