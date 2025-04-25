// Définition des types
interface Social {
  name: string;
  url: string;
}

interface Basics {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  social: Social[];
  avatar: string;
}

interface SkillCategory {
  category: string;
  items: string[];
}

interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
}

interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  image: string;
}

interface Language {
  language: string;
  fluency: string;
}

interface ProfileData {
  basics: Basics;
  skills: SkillCategory[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  languages: Language[];
  interests: string[];
}

// Fonction pour charger les données du profil depuis l'API
async function fetchProfileData(): Promise<ProfileData> {
  try {
    const response = await fetch('https://portfolio-dynamique.onrender.com/api/profile');
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données');
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
}

// Fonction pour envoyer les données mises à jour
async function updateProfileData(data: ProfileData): Promise<void> {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      throw new Error('Non authentifié');
    }
    
    const response = await fetch('https://portfolio-dynamique.onrender.com/api/admin/update-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour du profil');
    }
    
    alert('Profil mis à jour avec succès!');
  } catch (error) {
    console.error('Erreur:', error);
    alert(`Erreur lors de la mise à jour: ${error.message}`);
    throw error;
  }
}

// Authentification
async function login(username: string, password: string): Promise<boolean> {
  try {
    const response = await fetch('https://portfolio-dynamique.onrender.com/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    if (!response.ok) {
      throw new Error('Identifiants incorrects');
    }
    
    const data = await response.json();
    localStorage.setItem('adminToken', data.token);
    return true;
  } catch (error) {
    console.error('Erreur de connexion:', error);
    return false;
  }
}

// Vérification de l'authentification
function isAuthenticated(): boolean {
  return !!localStorage.getItem('adminToken');
}

// Déconnexion
function logout(): void {
  localStorage.removeItem('adminToken');
  showLoginSection();
}

// Afficher la section de connexion
function showLoginSection(): void {
  document.getElementById('login-section')!.style.display = 'block';
  document.getElementById('admin-panel')!.style.display = 'none';
  document.getElementById('login-status')!.textContent = 'Non connecté';
  document.getElementById('logout-btn')!.style.display = 'none';
}

// Afficher le panneau d'administration
function showAdminPanel(): void {
  document.getElementById('login-section')!.style.display = 'none';
  document.getElementById('admin-panel')!.style.display = 'block';
  document.getElementById('login-status')!.textContent = 'Connecté';
  document.getElementById('logout-btn')!.style.display = 'inline-block';
}

// Gestionnaire pour la navigation entre les sections
function setupNavigation(): void {
  const navLinks = document.querySelectorAll('.admin-nav a');
  const sections = document.querySelectorAll('.section');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Masquer toutes les sections
      sections.forEach(section => {
        section.style.display = 'none';
      });
      
      // Enlever la classe active de tous les liens
      navLinks.forEach(navLink => {
        navLink.classList.remove('active');
      });
      
      // Afficher la section correspondante
      const targetId = link.getAttribute('href')!.substring(1);
      document.getElementById(targetId)!.style.display = 'block';
      
      // Ajouter la classe active au lien cliqué
      link.classList.add('active');
    });
  });
}

// Fonction pour récupérer les données du formulaire
function getFormData(): ProfileData {
  // Récupération des informations de base
  const basics: Basics = {
    name: (document.getElementById('name') as HTMLInputElement).value,
    title: (document.getElementById('title') as HTMLInputElement).value,
    bio: (document.getElementById('bio') as HTMLTextAreaElement).value,
    email: (document.getElementById('email') as HTMLInputElement).value,
    phone: (document.getElementById('phone') as HTMLInputElement).value,
    location: (document.getElementById('location') as HTMLInputElement).value,
    website: (document.getElementById('website') as HTMLInputElement).value,
    avatar: (document.getElementById('avatar') as HTMLInputElement).value,
    social: []
  };
  
  // Récupération des réseaux sociaux
  const socialItems = document.querySelectorAll('.social-item');
  socialItems.forEach(item => {
    const nameInput = item.querySelector('input[name="social-name"]') as HTMLInputElement;
    const urlInput = item.querySelector('input[name="social-url"]') as HTMLInputElement;
    
    if (nameInput.value && urlInput.value) {
      basics.social.push({
        name: nameInput.value,
        url: urlInput.value
      });
    }
  });
  
  // Récupération des compétences
  const skills: SkillCategory[] = [];
  const skillCategories = document.querySelectorAll('.skill-category');
  
  skillCategories.forEach(category => {
    const categoryNameInput = category.querySelector('input[name="category-name"]') as HTMLInputElement;
    const skillsInput = category.querySelector('input[name="skills"]') as HTMLInputElement;
    
    if (categoryNameInput.value) {
      skills.push({
        category: categoryNameInput.value,
        items: skillsInput.value.split(',').map(item => item.trim()).filter(item => item)
      });
    }
  });
  
  // Récupération des expériences
  const experience: Experience[] = [];
  const experienceItems = document.querySelectorAll('.experience-item');
  
  experienceItems.forEach(item => {
    const titleInput = item.querySelector('input[name="exp-title"]') as HTMLInputElement;
    const companyInput = item.querySelector('input[name="exp-company"]') as HTMLInputElement;
    const locationInput = item.querySelector('input[name="exp-location"]') as HTMLInputElement;
    const startDateInput = item.querySelector('input[name="exp-start-date"]') as HTMLInputElement;
    const endDateInput = item.querySelector('input[name="exp-end-date"]') as HTMLInputElement;
    const descriptionInput = item.querySelector('textarea[name="exp-description"]') as HTMLTextAreaElement;
    const achievementsInput = item.querySelector('textarea[name="exp-achievements"]') as HTMLTextAreaElement;
    
    if (titleInput.value && companyInput.value) {
      experience.push({
        title: titleInput.value,
        company: companyInput.value,
        location: locationInput.value,
        startDate: startDateInput.value,
        endDate: endDateInput.value || 'Présent',
        description: descriptionInput.value,
        achievements: achievementsInput.value.split('\n').map(item => item.trim()).filter(item => item)
      });
    }
  });
  
  // Récupération des formations
  const education: Education[] = [];
  const educationItems = document.querySelectorAll('.education-item');
  
  educationItems.forEach(item => {
    const institutionInput = item.querySelector('input[name="edu-institution"]') as HTMLInputElement;
    const degreeInput = item.querySelector('input[name="edu-degree"]') as HTMLInputElement;
    const fieldInput = item.querySelector('input[name="edu-field"]') as HTMLInputElement;
    const startDateInput = item.querySelector('input[name="edu-start-date"]') as HTMLInputElement;
    const endDateInput = item.querySelector('input[name="edu-end-date"]') as HTMLInputElement;
    const descriptionInput = item.querySelector('textarea[name="edu-description"]') as HTMLTextAreaElement;
    
    if (institutionInput.value && degreeInput.value) {
      education.push({
        institution: institutionInput.value,
        degree: degreeInput.value,
        fieldOfStudy: fieldInput.value,
        startDate: startDateInput.value,
        endDate: endDateInput.value,
        description: descriptionInput.value
      });
    }
  });
  
  // Récupération des projets
  const projects: Project[] = [];
  const projectItems = document.querySelectorAll('.project-item');
  
  projectItems.forEach(item => {
    const titleInput = item.querySelector('input[name="project-title"]') as HTMLInputElement;
    const descriptionInput = item.querySelector('textarea[name="project-description"]') as HTMLTextAreaElement;
    const techInput = item.querySelector('input[name="project-tech"]') as HTMLInputElement;
    const linkInput = item.querySelector('input[name="project-link"]') as HTMLInputElement;
    const imageInput = item.querySelector('input[name="project-image"]') as HTMLInputElement;
    
    if (titleInput.value) {
      projects.push({
        title: titleInput.value,
        description: descriptionInput.value,
        technologies: techInput.value.split(',').map(item => item.trim()).filter(item => item),
        link: linkInput.value,
        image: imageInput.value
      });
    }
  });
  
  // Récupération des langues
  const languages: Language[] = [];
  const languageItems = document.querySelectorAll('.language-item');
  
  languageItems.forEach(item => {
    const languageInput = item.querySelector('input[name="language-name"]') as HTMLInputElement;
    const fluencyInput = item.querySelector('input[name="language-fluency"]') as HTMLInputElement;
    
    if (languageInput.value) {
      languages.push({
        language: languageInput.value,
        fluency: fluencyInput.value
      });
    }
  });
  
  // Récupération des intérêts
  const interestsInput = document.getElementById('interests-input') as HTMLInputElement;
  const interests = interestsInput.value.split(',').map(item => item.trim()).filter(item => item);
  
  return {
    basics,
    skills,
    experience,
    education,
    projects,
    languages,
    interests
  };
}

// Fonction pour pré-remplir le formulaire avec les données existantes
function populateForm(data: ProfileData): void {
  // Informations de base
  (document.getElementById('name') as HTMLInputElement).value = data.basics.name;
  (document.getElementById('title') as HTMLInputElement).value = data.basics.title;
  (document.getElementById('bio') as HTMLTextAreaElement).value = data.basics.bio;
  (document.getElementById('email') as HTMLInputElement).value = data.basics.email;
  (document.getElementById('phone') as HTMLInputElement).value = data.basics.phone;
  (document.getElementById('location') as HTMLInputElement).value = data.basics.location;
  (document.getElementById('website') as HTMLInputElement).value = data.basics.website;
  (document.getElementById('avatar') as HTMLInputElement).value = data.basics.avatar;
  
  // Réseaux sociaux
  const socialContainer = document.getElementById('social-links-container')!;
  socialContainer.innerHTML = '';
  
  data.basics.social.forEach(social => {
    const socialItem = createSocialItem(social);
    socialContainer.appendChild(socialItem);
  });
  
  // Compétences
  const skillsContainer = document.getElementById('skills-container')!;
  skillsContainer.innerHTML = '';
  
  data.skills.forEach(category => {
    const categoryItem = createSkillCategory(category);
    skillsContainer.appendChild(categoryItem);
  });
  
  // Expériences
  const experienceContainer = document.getElementById('experience-container')!;
  experienceContainer.innerHTML = '';
  
  data.experience.forEach(exp => {
    const expItem = createExperienceItem(exp);
    experienceContainer.appendChild(expItem);
  });
  
  // Formations
  const educationContainer = document.getElementById('education-container')!;
  educationContainer.innerHTML = '';
  
  data.education.forEach(edu => {
    const eduItem = createEducationItem(edu);
    educationContainer.appendChild(eduItem);
  });
  
  // Projets
  const projectsContainer = document.getElementById('projects-container')!;
  projectsContainer.innerHTML = '';
  
  data.projects.forEach(project => {
    const projectItem = createProjectItem(project);
    projectsContainer.appendChild(projectItem);
  });
  
  // Langues
  const languagesContainer = document.getElementById('languages-container')!;
  languagesContainer.innerHTML = '';
  
  data.languages.forEach(lang => {
    const langItem = createLanguageItem(lang);
    languagesContainer.appendChild(langItem);
  });
  
  // Intérêts
  (document.getElementById('interests-input') as HTMLInputElement).value = data.interests.join(', ');
}

// Création d'un élément réseau social
function createSocialItem(social?: Social): HTMLDivElement {
  const div = document.createElement('div');
  div.className = 'social-item';
  
  const nameLabel = document.createElement('label');
  nameLabel.textContent = 'Nom du réseau';
  
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.name = 'social-name';
  nameInput.required = true;
  if (social) nameInput.value = social.name;
  
  const urlLabel = document.createElement('label');
  urlLabel.textContent = 'URL du profil';
  
  const urlInput = document.createElement('input');
  urlInput.type = 'url';
  urlInput.name = 'social-url';
  urlInput.required = true;
  if (social) urlInput.value = social.url;
  
  const deleteBtn = document.createElement('span');
  deleteBtn.className = 'delete-btn';
  deleteBtn.innerHTML = '&times;';
  deleteBtn.addEventListener('click', () => {
    div.remove();
  });
  
  div.appendChild(nameLabel);
  div.appendChild(nameInput);
  div.appendChild(urlLabel);
  div.appendChild(urlInput);
  div.appendChild(deleteBtn);
  
  return div;
}

// Création d'une catégorie de compétences
function createSkillCategory(category?: SkillCategory): HTMLDivElement {
  const div = document.createElement('div');
  div.className = 'skill-category';
  
  const nameLabel = document.createElement('label');
  nameLabel.textContent = 'Nom de la catégorie';
  
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.name = 'category-name';
  nameInput.required = true;
  if (category) nameInput.value = category.category;
  
  const skillsLabel = document.createElement('label');
  skillsLabel.textContent = 'Compétences (séparées par des virgules)';
  
  const skillsInput = document.createElement('input');
  skillsInput.type = 'text';
  skillsInput.name = 'skills';
  if (category) skillsInput.value = category.items.join(', ');
  
  const deleteBtn = document.createElement('span');
  deleteBtn.className = 'delete-btn';
  deleteBtn.innerHTML = '&times;';
  deleteBtn.addEventListener('click', () => {
    div.remove();
  });
  
  div.appendChild(nameLabel);
  div.appendChild(nameInput);
  div.appendChild(skillsLabel);
  div.appendChild(skillsInput);
  div.appendChild(deleteBtn);
  
  return div;
}

// Création d'un élément d'expérience
function createExperienceItem(exp?: Experience): HTMLDivElement {
  const div = document.createElement('div');
  div.className = 'experience-item';
  
  const titleLabel = document.createElement('label');
  titleLabel.textContent = 'Poste';
  
  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.name = 'exp-title';
  titleInput.required = true;
  if (exp) titleInput.value = exp.title;
  
  const companyLabel = document.createElement('label');
  companyLabel.textContent = 'Entreprise';
  
  const companyInput = document.createElement('input');
  companyInput.type = 'text';
  companyInput.name = 'exp-company';
  companyInput.required = true;
  if (exp) companyInput.value = exp.company;
  
  const locationLabel = document.createElement('label');
  locationLabel.textContent = 'Localisation';
  
  const locationInput = document.createElement('input');
  locationInput.type = 'text';
  locationInput.name = 'exp-location';
  if (exp) locationInput.value = exp.location;
  
  const startDateLabel = document.createElement('label');
  startDateLabel.textContent = 'Date de début (YYYY-MM)';
  
  const startDateInput = document.createElement('input');
  startDateInput.type = 'text';
  startDateInput.name = 'exp-start-date';
  startDateInput.placeholder = 'YYYY-MM';
  if (exp) startDateInput.value = exp.startDate;
  
  const endDateLabel = document.createElement('label');
  endDateLabel.textContent = 'Date de fin (YYYY-MM ou "Présent")';
  
  const endDateInput = document.createElement('input');
  endDateInput.type = 'text';
  endDateInput.name = 'exp-end-date';
  endDateInput.placeholder = 'YYYY-MM ou laissez vide pour "Présent"';
  if (exp && exp.endDate !== 'Présent') endDateInput.value = exp.endDate;
  
  const descriptionLabel = document.createElement('label');
  descriptionLabel.textContent = 'Description';
  
  const descriptionInput = document.createElement('textarea');
  descriptionInput.name = 'exp-description';
  descriptionInput.rows = 4;
  if (exp) descriptionInput.value = exp.description;
  
  const achievementsLabel = document.createElement('label');
  achievementsLabel.textContent = 'Réalisations (une par ligne)';
  
  const achievementsInput = document.createElement('textarea');
  achievementsInput.name = 'exp-achievements';
  achievementsInput.rows = 4;
  if (exp) achievementsInput.value = exp.achievements.join('\n');
  
  const deleteBtn = document.createElement('span');
  deleteBtn.className = 'delete-btn';
  deleteBtn.innerHTML = '&times;';
  deleteBtn.addEventListener('click', () => {
    div.remove();
  });
  
  div.appendChild(titleLabel);
  div.appendChild(titleInput);
  div.appendChild(companyLabel);
  div.appendChild(companyInput);
  div.appendChild(locationLabel);
  div.appendChild(locationInput);
  div.appendChild(startDateLabel);
  div.appendChild(startDateInput);
  div.appendChild(endDateLabel);
  div.appendChild(endDateInput);
  div.appendChild(descriptionLabel);
  div.appendChild(descriptionInput);
  div.appendChild(achievementsLabel);
  div.appendChild(achievementsInput);
  div.appendChild(deleteBtn);
  
  return div;
}

// Création d'un élément de formation
function createEducationItem(edu?: Education): HTMLDivElement {
  const div = document.createElement('div');
  div.className = 'education-item';
  
  const institutionLabel = document.createElement('label');
  institutionLabel.textContent = 'Institution';
  
  const institutionInput = document.createElement('input');
  institutionInput.type = 'text';
  institutionInput.name = 'edu-institution';
  institutionInput.required = true;
  if (edu) institutionInput.value = edu.institution;
  
  const degreeLabel = document.createElement('label');
  degreeLabel.textContent = 'Diplôme';
  
  const degreeInput = document.createElement('input');
  degreeInput.type = 'text';
  degreeInput.name = 'edu-degree';
  degreeInput.required = true;
  if (edu) degreeInput.value = edu.degree;
  
  const fieldLabel = document.createElement('label');
  fieldLabel.textContent = 'Domaine d\'étude';
  
  const fieldInput = document.createElement('input');
  fieldInput.type = 'text';
  fieldInput.name = 'edu-field';
  if (edu) fieldInput.value = edu.fieldOfStudy;
  
  const startDateLabel = document.createElement('label');
  startDateLabel.textContent = 'Année de début';
  
  const startDateInput = document.createElement('input');
  startDateInput.type = 'text';
  startDateInput.name = 'edu-start-date';
  if (edu) startDateInput.value = edu.startDate;
  
  const endDateLabel = document.createElement('label');
  endDateLabel.textContent = 'Année de fin';
  
  const endDateInput = document.createElement('input');
  endDateInput.type = 'text';
  endDateInput.name = 'edu-end-date';
  if (edu) endDateInput.value = edu.endDate;
  
  const descriptionLabel = document.createElement('label');
  descriptionLabel.textContent = 'Description';
  
  const descriptionInput = document.createElement('textarea');
  descriptionInput.name = 'edu-description';
  descriptionInput.rows = 4;
  if (edu) descriptionInput.value = edu.description;
  
  const deleteBtn = document.createElement('span');
  deleteBtn.className = 'delete-btn';
  deleteBtn.innerHTML = '&times;';
  deleteBtn.addEventListener('click', () => {
    div.remove();
  });
  
  div.appendChild(institutionLabel);
  div.appendChild(institutionInput);
  div.appendChild(degreeLabel);
  div.appendChild(degreeInput);
  div.appendChild(fieldLabel);
  div.appendChild(fieldInput);
  div.appendChild(startDateLabel);
  div.appendChild(startDateInput);
  div.appendChild(endDateLabel);
  div.appendChild(endDateInput);
  div.appendChild(descriptionLabel);
  div.appendChild(descriptionInput);
  div.appendChild(deleteBtn);
  
  return div;
}

// Création d'un élément de projet
function createProjectItem(project?: Project): HTMLDivElement {
  const div = document.createElement('div');
  div.className = 'project-item';
  
  const titleLabel = document.createElement('label');
  titleLabel.textContent = 'Titre du projet';
  
  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.name = 'project-title';
  titleInput.required = true;
  if (project) titleInput.value = project.title;
  
  const descriptionLabel = document.createElement('label');
  descriptionLabel.textContent = 'Description';
  
  const descriptionInput = document.createElement('textarea');
  descriptionInput.name = 'project-description';
  descriptionInput.rows = 4;
  if (project) descriptionInput.value = project.description;
  
  const techLabel = document.createElement('label');
  techLabel.textContent = 'Technologies (séparées par des virgules)';
  
  const techInput = document.createElement('input');
  techInput.type = 'text';
  techInput.name = 'project-tech';
  if (project) techInput.value = project.technologies.join(', ');
  
  const linkLabel = document.createElement('label');
  linkLabel.textContent = 'Lien du projet';
  
  const linkInput = document.createElement('input');
  linkInput.type = 'url';
  linkInput.name = 'project-link';
  if (project) linkInput.value = project.link;
  
  const imageLabel = document.createElement('label');
  imageLabel.textContent = 'URL de l\'image';
  
  const imageInput = document.createElement('input');
  imageInput.type = 'url';
  imageInput.name = 'project-image';
  if (project) imageInput.value = project.image;
  
  const deleteBtn = document.createElement('span');
  deleteBtn.className = 'delete-btn';
  deleteBtn.innerHTML = '&times;';
  deleteBtn.addEventListener('click', () => {
    div.remove();
  });
  
  div.appendChild(titleLabel);
  div.appendChild(titleInput);
  div.appendChild(descriptionLabel);
  div.appendChild(descriptionInput);
  div.appendChild(techLabel);
  div.appendChild(techInput);
  div.appendChild(linkLabel);
  div.appendChild(linkInput);
  div.appendChild(imageLabel);
  div.appendChild(imageInput);
  div.appendChild(deleteBtn);
  
  return div;
}

// Création d'un élément de langue
function createLanguageItem(lang?: Language): HTMLDivElement {
  const div = document.createElement('div');
  div.className = 'language-item';
  
  const languageLabel = document.createElement('label');
  languageLabel.textContent = 'Langue';
  
  const languageInput = document.createElement('input');
  languageInput.type = 'text';
  languageInput.name = 'language-name';
  languageInput.required = true;
  if (lang) languageInput.value = lang.language;
  
  const fluencyLabel = document.createElement('label');
  fluencyLabel.textContent = 'Niveau';
  
  const fluencyInput = document.createElement('input');
  fluencyInput.type = 'text';
  fluencyInput.name = 'language-fluency';
  if (lang) fluencyInput.value = lang.fluency;
  
  const deleteBtn = document.createElement('span');
  deleteBtn.className = 'delete-btn';
  deleteBtn.innerHTML = '&times;';
  deleteBtn.addEventListener('click', () => {
    div.remove();
  });
  
  div.appendChild(languageLabel);
  div.appendChild(languageInput);
  div.appendChild(fluencyLabel);
  div.appendChild(fluencyInput);
  div.appendChild(deleteBtn);
  
  return div;
}

// Gestion des événements pour ajouter des éléments
function setupEventListeners(): void {
  // Ajout d'un réseau social
  document.getElementById('add-social')!.addEventListener('click', () => {
    const socialItem = createSocialItem();
    document.getElementById('social-links-container')!.appendChild(socialItem);
  });
  
  // Ajout d'une catégorie de compétences
  document.getElementById('add-skill-category')!.addEventListener('click', () => {
    const categoryItem = createSkillCategory();
    document.getElementById('skills-container')!.appendChild(categoryItem);
  });
  
  // Ajout d'une expérience
  document.getElementById('add-experience')!.addEventListener('click', () => {
    const expItem = createExperienceItem();
    document.getElementById('experience-container')!.appendChild(expItem);
  });
  
  // Ajout d'une formation
  document.getElementById('add-education')!.addEventListener('click', () => {
    const eduItem = createEducationItem();
    document.getElementById('education-container')!.appendChild(eduItem);
  });
  
  // Ajout d'un projet
  document.getElementById('add-project')!.addEventListener('click', () => {
    const projectItem = createProjectItem();
    document.getElementById('projects-container')!.appendChild(projectItem);
  });
  
  // Ajout d'une langue
  document.getElementById('add-language')!.addEventListener('click', () => {
    const langItem = createLanguageItem();
    document.getElementById('languages-container')!.appendChild(langItem);
  });
  
  // Enregistrement de toutes les modifications
  document.getElementById('save-all')!.addEventListener('click', async () => {
    try {
      const formData = getFormData();
      await updateProfileData(formData);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  });
  
  // Réinitialisation (rechargement des données depuis l'API)
  document.getElementById('reset-changes')!.addEventListener('click', async () => {
    try {
      if (confirm('Êtes-vous sûr de vouloir annuler toutes vos modifications?')) {
        const data = await fetchProfileData();
        populateForm(data);
      }
    } catch (error) {
      console.error('Erreur lors de la réinitialisation:', error);
    }
  });
  
  // Gestion du formulaire de connexion
  document.getElementById('login-form')!.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    
    const success = await login(usernameInput.value, passwordInput.value);
    
    if (success) {
      showAdminPanel();
      const data = await fetchProfileData();
      populateForm(data);
    } else {
      alert('Identifiants incorrects. Veuillez réessayer.');
    }
  });
  
  // Gestion du bouton de déconnexion
  document.getElementById('logout-btn')!.addEventListener('click', () => {
    logout();
  });
}

// Initialisation de l'application
async function initAdminApp(): Promise<void> {
  setupNavigation();
  setupEventListeners();
  
  // Vérifier si l'utilisateur est déjà authentifié
  if (isAuthenticated()) {
    showAdminPanel();
    try {
      const data = await fetchProfileData();
      populateForm(data);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      alert('Impossible de charger les données du profil. Veuillez réessayer.');
    }
  } else {
    showLoginSection();
  }
}

// Ajout de la fonction pour changer de section dans le panel admin
function setupTabNavigation(): void {
  const navLinks = document.querySelectorAll('.sidebar-nav a');
  const sections = document.querySelectorAll('.form-section');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Enlever la classe active de tous les liens
      navLinks.forEach(navLink => {
        navLink.classList.remove('active');
      });
      
      // Ajouter la classe active au lien cliqué
      (e.currentTarget as HTMLElement).classList.add('active');
      
      // Masquer toutes les sections
      sections.forEach(section => {
        (section as HTMLElement).classList.add('hidden');
      });
      
      // Afficher la section correspondante
      const sectionId = (e.currentTarget as HTMLElement).getAttribute('data-section') + '-section';
      const section = document.getElementById(sectionId);
      if (section) {
        section.classList.remove('hidden');
        document.getElementById('section-title')!.textContent = (e.currentTarget as HTMLElement).textContent!.trim();
      }
    });
  });
}

// Fonction pour corriger les éléments manquants du DOM
function fixDOMElements(): void {
  // Créer l'élément login-status s'il n'existe pas
  if (!document.getElementById('login-status')) {
    const loginStatus = document.createElement('div');
    loginStatus.id = 'login-status';
    loginStatus.style.display = 'none'; // Cacher car on ne l'utilise pas dans le design actuel
    document.body.appendChild(loginStatus);
  }

  // Vérifier et créer les conteneurs pour chaque section si nécessaire
  const containers = [
    { id: 'social-links-container', parent: 'social-list' },
    { id: 'skills-container', parent: 'skill-categories' },
    { id: 'experience-container', parent: 'experience-list' },
    { id: 'education-container', parent: 'education-list' },
    { id: 'projects-container', parent: 'projects-list' },
    { id: 'languages-container', parent: 'languages-list' }
  ];

  containers.forEach(container => {
    const parent = document.getElementById(container.parent);
    if (parent && !document.getElementById(container.id)) {
      const div = document.createElement('div');
      div.id = container.id;
      parent.appendChild(div);
    }
  });

  // Vérifier si l'input interests existe, sinon le renommer de interests à interests-input
  if (!document.getElementById('interests-input') && document.getElementById('interests')) {
    const interests = document.getElementById('interests');
    if (interests) {
      interests.id = 'interests-input';
    }
  }

  // Ajouter les boutons de sauvegarde et de réinitialisation s'ils n'existent pas
  if (!document.getElementById('save-all')) {
    const saveBtn = document.getElementById('save-btn');
    if (saveBtn) {
      saveBtn.id = 'save-all';
    }
  }

  if (!document.getElementById('reset-changes')) {
    const resetBtn = document.createElement('button');
    resetBtn.id = 'reset-changes';
    resetBtn.className = 'btn btn-outline';
    resetBtn.innerHTML = '<i class="fas fa-undo"></i> Réinitialiser';
    
    const saveBtn = document.getElementById('save-all') || document.getElementById('save-btn');
    if (saveBtn && saveBtn.parentNode) {
      saveBtn.parentNode.insertBefore(resetBtn, saveBtn);
    }
  }
}

// Point d'entrée principal du script
document.addEventListener('DOMContentLoaded', () => {
  fixDOMElements(); // Corriger tout élément DOM manquant
  setupTabNavigation(); // Configuration de la navigation par onglets
  initAdminApp(); // Initialiser l'application
});