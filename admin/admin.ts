const API_BASE_URL = "https://portfolio-dynamique.onrender.com/api";
let authToken = "";

// Utilitaires DOM
const $ = (selector: string): HTMLElement | null => document.querySelector(selector);
const $$ = (selector: string): NodeListOf<HTMLElement> => document.querySelectorAll(selector);

// Gestion du formulaire de connexion
$("#login-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = (document.getElementById("username") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement).value;

  try {
    const res = await fetch(`${API_BASE_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      authToken = data.token;
      $("#login-section")?.classList.add("hidden");
      $("#admin-panel")?.classList.remove("hidden");
      await loadProfileData();
    } else {
      alert(data.error || "Erreur de connexion.");
    }
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    alert("Une erreur est survenue lors de la connexion.");
  }
});

// Gestion de la déconnexion
$("#logout-btn")?.addEventListener("click", () => {
  authToken = "";
  $("#login-section")?.classList.remove("hidden");
  $("#admin-panel")?.classList.add("hidden");
});

// Navigation entre les sections
$$(".sidebar-nav a").forEach((link) =>
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const section = (e.currentTarget as HTMLElement).dataset.section!;
    switchSection(section);
  })
);

// Affiche la section sélectionnée
function switchSection(sectionId: string) {
  $$(".form-section").forEach((s) => s.classList.add("hidden"));
  $(`#${sectionId}-section`)?.classList.remove("hidden");
  const sectionTitle = $(`a[data-section="${sectionId}"]`)?.textContent || "";
  $("#section-title")!.textContent = sectionTitle;
  $$(".sidebar-nav a").forEach((a) => a.classList.remove("active"));
  $(`a[data-section="${sectionId}"]`)?.classList.add("active");
}

// Chargement des données du profil
async function loadProfileData() {
  try {
    const res = await fetch(`${API_BASE_URL}/profile`);
    const data = await res.json();

    const basics = data.basics || {};
    (document.getElementById("name") as HTMLInputElement).value = basics.name || "";
    (document.getElementById("title") as HTMLInputElement).value = basics.label || "";
    (document.getElementById("bio") as HTMLTextAreaElement).value = basics.summary || "";
    (document.getElementById("email") as HTMLInputElement).value = basics.email || "";
    (document.getElementById("phone") as HTMLInputElement).value = basics.phone || "";
    (document.getElementById("location") as HTMLInputElement).value = basics.location || "";
    (document.getElementById("avatar") as HTMLInputElement).value = basics.picture || "";

    // Réseaux sociaux
    const socialList = $("#social-list");
    socialList!.innerHTML = "";
    (basics.profiles || []).forEach((profile: any, i: number) => {
      const div = document.createElement("div");
      div.className = "form-group";
      div.innerHTML = `
        <input type="text" placeholder="Nom" value="${profile.network}" data-index="${i}" class="social-network">
        <input type="url" placeholder="URL" value="${profile.url}" data-index="${i}" class="social-url">
      `;
      socialList!.appendChild(div);
    });

    // Compétences
    const skillCategories = $("#skill-categories");
    skillCategories!.innerHTML = "";
    (data.skills || []).forEach((category: any, i: number) => {
      const div = document.createElement("div");
      div.className = "form-group";
      div.innerHTML = `
        <input type="text" placeholder="Catégorie" value="${category.name}" class="skill-category-name">
        <textarea placeholder="Compétences (séparées par des virgules)" class="skill-category-skills">${category.keywords.join(", ")}</textarea>
      `;
      skillCategories!.appendChild(div);
    });

    // Expériences
    const experienceList = $("#experience-list");
    experienceList!.innerHTML = "";
    (data.work || []).forEach((exp: any, i: number) => {
      const div = document.createElement("div");
      div.className = "form-group";
      div.innerHTML = `
        <input type="text" placeholder="Entreprise" value="${exp.company}" class="experience-company">
        <input type="text" placeholder="Poste" value="${exp.position}" class="experience-position">
        <input type="text" placeholder="Date de début" value="${exp.startDate}" class="experience-start">
        <input type="text" placeholder="Date de fin" value="${exp.endDate}" class="experience-end">
        <textarea placeholder="Résumé" class="experience-summary">${exp.summary}</textarea>
      `;
      experienceList!.appendChild(div);
    });

    // Formations
    const educationList = $("#education-list");
    educationList!.innerHTML = "";
    (data.education || []).forEach((edu: any, i: number) => {
      const div = document.createElement("div");
      div.className = "form-group";
      div.innerHTML = `
        <input type="text" placeholder="Établissement" value="${edu.institution}" class="education-institution">
        <input type="text" placeholder="Diplôme" value="${edu.studyType}" class="education-degree">
        <input type="text" placeholder="Date de début" value="${edu.startDate}" class="education-start">
        <input type="text" placeholder="Date de fin" value="${edu.endDate}" class="education-end">
        <textarea placeholder="Résumé" class="education-summary">${edu.summary}</textarea>
      `;
      educationList!.appendChild(div);
    });

    // Projets
    const projectsList = $("#projects-list");
    projectsList!.innerHTML = "";
    (data.projects || []).forEach((proj: any, i: number) => {
      const div = document.createElement("div");
      div.className = "form-group";
      div.innerHTML = `
        <input type="text" placeholder="Nom du projet" value="${proj.name}" class="project-name">
        <input type="url" placeholder="URL" value="${proj.url}" class="project-url">
        <textarea placeholder="Description" class="project-description">${proj.description}</textarea>
      `;
      projectsList!.appendChild(div);
    });
  } catch (error) {
    console.error("Erreur lors du chargement du profil:", error);
    alert("Échec du chargement des données.");
  }
}

// Soumission du formulaire d'enregistrement des données
$("#save-btn")?.addEventListener("click", async () => {
  try {
    const profile: any = {
      basics: {
        name: (document.getElementById("name") as HTMLInputElement).value,
        label: (document.getElementById("title") as HTMLInputElement).value,
        summary: (document.getElementById("bio") as HTMLTextAreaElement).value,
        email: (document.getElementById("email") as HTMLInputElement).value,
        phone: (document.getElementById("phone") as HTMLInputElement).value,
        location: (document.getElementById("location") as HTMLInputElement).value,
        picture: (document.getElementById("avatar") as HTMLInputElement).value,
        profiles: [],
      },
      skills: [],
      work: [],
      education: [],
      projects: [],
    };

    // Réseaux sociaux
    const networkInputs = $$(".social-network");
    const urlInputs = $$(".social-url");
    for (let i = 0; i < networkInputs.length; i++) {
      const network = (networkInputs[i] as HTMLInputElement).value;
      const url = (urlInputs[i] as HTMLInputElement).value;
      if (network && url) profile.basics.profiles.push({ network, url });
    }

    // Compétences
    const skillCategories = $$(".skill-category-name");
    const skillKeywords = $$(".skill-category-skills");
    for (let i = 0; i < skillCategories.length; i++) {
      const name = (skillCategories[i] as HTMLInputElement).value;
      const keywords = (skillKeywords[i] as HTMLTextAreaElement).value.split(",").map(k => k.trim());
      if (name && keywords.length) profile.skills.push({ name, keywords });
    }

    // Expériences
    const companies = $$(".experience-company");
    const positions = $$(".experience-position");
    const starts = $$(".experience-start");
    const ends = $$(".experience-end");
    const summaries = $$(".experience-summary");
    for (let i = 0; i < companies.length; i++) {
      const company = (companies[i] as HTMLInputElement).value;
      const position = (positions[i] as HTMLInputElement).value;
      const startDate = (starts[i] as HTMLInputElement).value;
      const endDate = (ends[i] as HTMLInputElement).value;
      const summary = (summaries[i] as HTMLTextAreaElement).value;
      if (company && position) profile.work.push({ company, position, startDate, endDate, summary });
    }

    // Formations
    const institutions = $$(".education-institution");
    const degrees = $$(".education-degree");
    const eduStarts = $$(".education-start");
    const eduEnds = $$(".education-end");
    const eduSummaries = $$(".education-summary");
    for (let i = 0; i < institutions.length; i++) {
      const institution = (institutions[i] as HTMLInputElement).value;
      const studyType = (degrees[i] as HTMLInputElement).value;
      const startDate = (eduStarts[i] as HTMLInputElement).value;
      const endDate = (eduEnds[i] as HTMLInputElement).value;
      const summary = (eduSummaries[i] as HTMLTextAreaElement).value;
      if (institution && studyType) profile.education.push({ institution, studyType, startDate, endDate, summary });
    }

    // Projets
    const projectNames = $$(".project-name");
    const projectUrls = $$(".project-url");
    const projectDescs = $$(".project-description");
    for (let i = 0; i < projectNames.length; i++) {
      const name = (projectNames[i] as HTMLInputElement).value;
      const url = (projectUrls[i] as HTMLInputElement).value;
      const description = (projectDescs[i] as HTMLTextAreaElement).value;
      if (name) profile.projects.push({ name, url, description });
    }

    const res = await fetch(`${API_BASE_URL}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(profile),
    });

    if (!res.ok) throw new Error("Erreur lors de l'enregistrement");

    alert("Profil enregistré avec succès !");
  } catch (error) {
    console.error("Erreur lors de la sauvegarde:", error);
    alert("Échec de l'enregistrement.");
  }
});