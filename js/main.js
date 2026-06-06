document.addEventListener('alpine:init', () => {
  Alpine.data('globalState', () => ({
    darkMode: localStorage.getItem('darkMode') === 'true' || 
      (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches),
    mobileMenuOpen: false,
    
    init() {
      // Set correct class on startup based on Alpine variable
      if (this.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    
    toggleTheme() {
      this.darkMode = !this.darkMode;
      localStorage.setItem('darkMode', this.darkMode);
      if (this.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }));
});

// Scroll Reveal System using IntersectionObserver
document.addEventListener('DOMContentLoaded', () => {
  const revealOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  const applyScrollReveal = () => {
    const targets = document.querySelectorAll('.reveal');
    targets.forEach(target => {
      revealObserver.observe(target);
    });
  };

  // Initial call
  applyScrollReveal();

  // Create a global trigger to allow re-checking elements when lists filter
  window.addEventListener('refresh-scroll-reveal', () => {
    setTimeout(applyScrollReveal, 100);
  });
});
