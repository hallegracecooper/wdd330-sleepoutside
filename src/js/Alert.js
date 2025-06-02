export default class Alert {
  constructor() {
    this.path = '/json/alerts.json';
  }

  async init() {
    try {
      const response = await fetch(this.path);
      if (response.ok) {
        const alerts = await response.json();
        this.renderAlerts(alerts);
      }
    } catch (error) {
      console.error('Error loading alerts:', error);
    }
  }

  renderAlerts(alerts) {
    if (!alerts || !alerts.length) return;

    const section = document.createElement('section');
    section.classList.add('alert-list');

    alerts.forEach(alert => {
      const p = document.createElement('p');
      p.textContent = alert.message;
      p.style.backgroundColor = alert.background;
      p.style.color = alert.color;
      section.appendChild(p);
    });

    const main = document.querySelector('main');
    if (main) {
      main.prepend(section);
    }
  }
} 