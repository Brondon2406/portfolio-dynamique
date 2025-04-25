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

// Fonction pour formater une date (YYYY-MM en format lisible)
function formatDate(dateString: string): string {
  if (dateString === 'Présent') return 'Présent';
  
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
  return new Intl.DateTimeFormat('fr-FR', options).format(date);
}

// Fonction pour créer les éléments de l'en-tête
function renderHeader(data: ProfileData): void {
  // Avatar
  const avatarDiv = document.getElementById('profile-avatar');
  if (avatarDiv) {
    avatarDiv.innerHTML = `<img src="${data.basics.avatar}" alt="${data.basics.name}">`;
  }
  
  // Nom et titre
  const nameElement = document.getElementById('profile-name');
  if (nameElement) {
    nameElement.textContent = data.basics.name;
  }
  
  const titleElement = document.getElementById('profile-title');
  if (titleElement) {
    titleElement.textContent = data.basics.title;
  }
  
  // Liens sociaux
  const socialLinksElement = document.getElementById('social-links');
  if (socialLinksElement && data.basics.social) {
    socialLinksElement.innerHTML = data.basics.social.map(social => {
      let icon = 'fas fa-link';
      
      // Déterminer l'icône en fonction du nom du réseau social
      if (social.name.toLowerCase().includes('github')) icon = 'fab fa-github';
      else if (social.name.toLowerCase().includes('linkedin')) icon = 'fab fa-linkedin';
      else if (social.name.toLowerCase().includes('twitter')) icon = 'fab fa-twitter';
      else if (social.name.toLowerCase().includes('facebook')) icon = 'fab fa-facebook';
      else if (social.name.toLowerCase().includes('instagram')) icon = 'fab fa-instagram';
      
      return `<li><a href="${social.url}" target="_blank" rel="noopener noreferrer"><i class="${icon}"></i></a></li>`;
    }).join('');
  }
}

// Fonction pour créer la section À propos
function renderAbout(data: ProfileData): void {
  const bioElement = document.getElementById('profile-bio');
  if (bioElement) {
    bioElement.textContent = data.basics.bio;
  }
}

// Fonction pour créer la section Compétences
function renderSkills(data: ProfileData): void {
  const skillsContent = document.getElementById('skills-content');
  if (skillsContent && data.skills) {
    skillsContent.innerHTML = data.skills.map(category => `
      <div class="skill-category">
        <h3>${category.category}</h3>
        <div class="skill-items">
          ${category.items.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }
}

// Fonction pour créer la section Expérience
function renderExperience(data: ProfileData): void {
  const experienceTimeline = document.getElementById('experience-timeline');
  if (experienceTimeline && data.experience) {
    experienceTimeline.innerHTML = data.experience.map((exp, index) => `
      <div class="timeline-item">
        <div class="timeline-content">
          <span class="timeline-date">${formatDate(exp.startDate)} - ${formatDate(exp.endDate)}</span>
          <h3 class="timeline-title">${exp.title}</h3>
          <h4 class="timeline-subtitle">${exp.company}, ${exp.location}</h4>
          <p class="timeline-description">${exp.description}</p>
          ${exp.achievements && exp.achievements.length > 0 ? `
            <ul class="timeline-achievements">
              ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
            </ul>
          ` : ''}
        </div>
      </div>
    `).join('');
  }
}

// Fonction pour créer la section Formation
function renderEducation(data: ProfileData): void {
  const educationTimeline = document.getElementById('education-timeline');
  if (educationTimeline && data.education) {
    educationTimeline.innerHTML = data.education.map((edu, index) => `
      <div class="timeline-item">
        <div class="timeline-content">
          <span class="timeline-date">${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</span>
          <h3 class="timeline-title">${edu.degree}</h3>
          <h4 class="timeline-subtitle">${edu.institution} - ${edu.fieldOfStudy}</h4>
          <p class="timeline-description">${edu.description}</p>
        </div>
      </div>
    `).join('');
  }
}

// Fonction pour créer la section Projets
function renderProjects(data: ProfileData): void {
  const projectsGrid = document.getElementById('projects-grid');
  if (projectsGrid && data.projects) {
    projectsGrid.innerHTML = data.projects.map(project => `
      <div class="project-card">
        <div class="project-img">
          <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="project-info">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
          <div class="project-tech">
            ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
          </div>
          <a href="${project.link}" class="project-link" target="_blank" rel="noopener noreferrer">Voir le projet</a>
        </div>
      </div>
    `).join('');
  }
}

// Fonction pour créer la section Contact
function renderContact(data: ProfileData): void {
  const emailElement = document.getElementById('profile-email');
  if (emailElement) {
    emailElement.textContent = data.basics.email;
  }
  
  const phoneElement = document.getElementById('profile-phone');
  if (phoneElement) {
    phoneElement.textContent = data.basics.phone;
  }
  
  const locationElement = document.getElementById('profile-location');
  if (locationElement) {
    locationElement.textContent = data.basics.location;
  }
}

// Fonction pour initialiser le formulaire de contact
function initContactForm(): void {
  const contactForm = document.getElementById('contact-form') as HTMLFormElement;
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Dans une vraie application, vous enverriez ces données à un endpoint d'API
      const formData = {
        name: (document.getElementById('name') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        message: (document.getElementById('message') as HTMLTextAreaElement).value
      };
      
      // Simuler l'envoi (à remplacer par un vrai appel API)
      alert(`Message envoyé !\nNom: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);
      contactForm.reset();
    });
  }
}

// Fonction pour mettre à jour l'année dans le footer
function updateFooterYear(): void {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear().toString();
  }
}

// Fonction principale pour initialiser la page
async function initPortfolio(): Promise<void> {
  try {
    // Charger les données du profil
    const profileData = await fetchProfileData();
    
    // Mettre à jour le DOM avec les données
    renderHeader(profileData);
    renderAbout(profileData);
    renderSkills(profileData);
    renderExperience(profileData);
    renderEducation(profileData);
    renderProjects(profileData);
    renderContact(profileData);
    
    // Initialiser le formulaire de contact
    initContactForm();
    
    // Mettre à jour l'année dans le footer
    updateFooterYear();
    
  } catch (error) {
    console.error('Erreur lors de l\'initialisation du portfolio:', error);
    document.body.innerHTML = `
      <div style="text-align: center; padding: 50px;">
        <h1>Erreur de chargement</h1>
        <p>Impossible de charger les données du portfolio. Veuillez réessayer plus tard.</p>
      </div>
    `;
  }
}

// Démarrer l'application
document.addEventListener('DOMContentLoaded', initPortfolio);