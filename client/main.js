fetch('https://portfolio-dynamique.onrender.com')
    .then(function (res) { return res.json(); })
    .then(function (data) {
    document.getElementById('name').textContent = data.name;
    document.getElementById('title').textContent = data.title;
    var projects = document.getElementById('projects');
    data.projects.forEach(function (project) {
        var div = document.createElement('div');
        div.innerHTML = "<h3>".concat(project.name, "</h3><p>").concat(project.description, "</p>");
        projects.appendChild(div);
    });
});
