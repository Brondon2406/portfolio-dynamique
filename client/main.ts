fetch('https://portfolio-dynamique.onrender.com')
  .then(res => res.json())
  .then(data => {
    document.getElementById('name')!.textContent = data.name;
    document.getElementById('title')!.textContent = data.title;
    const projects = document.getElementById('projects')!;
    data.projects.forEach((project: any) => {
      const div = document.createElement('div');
      div.innerHTML = `<h3>${project.name}</h3><p>${project.description}</p>`;
      projects.appendChild(div);
    });
  });