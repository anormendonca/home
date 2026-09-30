const projects = [
  {
    id: 'portfolio',
    name: 'PORTFOLIO',
    title: 'Personal Portfolio & Showcase',
    desc: 'Interactive platform highlighting personal work, design philosophy, case studies, and engineering projects.',
    url: 'https://anormendonca.github.io/portfolio',
    category: 'Personal Brand',
    image: 'https://i.pinimg.com/736x/20/a6/86/20a68668fbcc120d6d880ffb233b9473.jpg',
    stats: [
      { val: '100%', label: 'Custom Code' },
      { val: '2026', label: 'Updated' },
      { val: '5x', label: 'Case Studies' }
    ]
  },
  {
    id: 'games',
    name: 'GAMES HUB',
    title: 'Party & Multiplayer Suite',
    desc: 'A web suite for pass-and-play social games like Impostor, Mafia, and Fake Artist.',
    url: 'https://anormendonca.github.io/games',
    category: 'Gaming Platform',
    image: 'https://i.pinimg.com/736x/07/8c/4a/078c4a00bf42f8ef6122c79a3873fce9.jpg',
    stats: [
      { val: '3+', label: 'Games Built' },
      { val: 'Local', label: 'Pass & Play' },
      { val: '100%', label: 'Free' }
    ]
  },
  {
    id: 'fmhl',
    name: 'FMHL PLATFORM',
    title: 'Free Minecraft Hosting List',
    desc: 'Free Minecraft hosting list, MC totem, and MC skin creator.',
    url: 'https://anormendonca.github.io/fmhl',
    category: 'Minecraft Suite',
    image: 'https://i.pinimg.com/736x/be/67/c4/be67c41aaceb3854347b983fec91103f.jpg',
    stats: [
      { val: 'Realtime', label: 'Listings' },
      { val: 'Skin', label: 'Creator' },
      { val: 'Totem', label: 'Generator' }
    ]
  },
  {
    id: 'productivity',
    name: 'PRODUCTIVITY',
    title: 'Workflow & Focus Suite',
    desc: 'Minimalist suite of productivity tools, task trackers, and focus utilities designed for execution.',
    url: 'https://anormendonca.github.io/productivity',
    category: 'Utilities',
    image: 'https://i.pinimg.com/736x/78/81/a2/7881a2e6661cdf0a04e0feec569c00b6.jpg',
    stats: [
      { val: '+40%', label: 'Output' },
      { val: '0', label: 'Distractions' },
      { val: 'Offline', label: 'Ready' }
    ]
  }
];

let currentIndex = 0;
let lastDirection = 'next';

const deck = document.getElementById('deck');
const dotsContainer = document.getElementById('dotsContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function renderCards() {
  deck.innerHTML = '';
  dotsContainer.innerHTML = '';

  projects.forEach((proj, idx) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    if (idx === currentIndex) {
      card.classList.add('active');
      card.classList.add(lastDirection === 'next' ? 'slide-next' : 'slide-prev');
    } else if (idx === (currentIndex - 1 + projects.length) % projects.length) {
      card.classList.add('prev-card');
    } else if (idx === (currentIndex + 1) % projects.length) {
      card.classList.add('next-card');
    }

    const statsHtml = proj.stats.map(s => `
      <div class="stat-item">
        <span class="stat-value">${s.val}</span>
        <span class="stat-label">${s.label}</span>
      </div>
    `).join('');

    card.innerHTML = `
      <div class="card-visual">
        <div class="card-visual-bg" style="background-image: url('${proj.image}');"></div>
        <div class="visual-overlay"></div>
        <div class="visual-tag">${proj.category}</div>
      </div>
      <div class="card-info">
        <div>
          <div class="card-header">
            <div class="site-icon">${proj.name.charAt(0)}</div>
            <div class="site-name">${proj.name}</div>
          </div>
          <h2 class="card-title">${proj.title}</h2>
          <p class="card-desc">${proj.desc}</p>
          <a href="${proj.url}" target="_blank" class="link-btn">
            Read More
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        </div>
        <div class="card-stats">
          ${statsHtml}
        </div>
      </div>
    `;

    deck.appendChild(card);

    const dot = document.createElement('div');
    dot.className = `dot ${idx === currentIndex ? 'active' : ''}`;
    dot.addEventListener('click', () => goTo(idx));
    dotsContainer.appendChild(dot);
  });
}

function goTo(index) {
  lastDirection = index > currentIndex ? 'next' : 'prev';
  currentIndex = index;
  renderCards();
}

function triggerButtonAnimation(button, className) {
  button.classList.remove(className);
  void button.offsetWidth; // Trigger reflow
  button.classList.add(className);
  setTimeout(() => button.classList.remove(className), 400);
}

prevBtn.addEventListener('click', () => {
  lastDirection = 'prev';
  triggerButtonAnimation(prevBtn, 'animate-prev');
  currentIndex = (currentIndex - 1 + projects.length) % projects.length;
  renderCards();
});

nextBtn.addEventListener('click', () => {
  lastDirection = 'next';
  triggerButtonAnimation(nextBtn, 'animate-next');
  currentIndex = (currentIndex + 1) % projects.length;
  renderCards();
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'ArrowRight') nextBtn.click();
});

renderCards();
