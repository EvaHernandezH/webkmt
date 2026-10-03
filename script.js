/* ==========================================================
   WIN KMT INTERNET SOLUTION - INTERACTIVE ENGINE
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // 2. Animated Numerical Counters
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const runCounters = () => {
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const isDecimal = target % 1 !== 0;
      let count = 0;
      const speed = target / 40;

      const updateCount = () => {
        count += speed;
        if (count < target) {
          counter.innerText = isDecimal ? count.toFixed(1) : Math.ceil(count);
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = isDecimal ? target.toFixed(1) : target;
        }
      };
      updateCount();
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        runCounters();
        animated = true;
      }
    });
  }, { threshold: 0.4 });

  const metricsCard = document.querySelector('.hero-main-card');
  if (metricsCard) observer.observe(metricsCard);

  // 3. Services Tabs Toggle (Ventas vs Técnica)
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanels = document.querySelectorAll('.tab-content-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // 4. Interactive Simulator / Quote Form Engine
  const typeButtons = document.querySelectorAll('.btn-type-opt');
  let currentServiceType = 'hogar';

  typeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      typeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentServiceType = btn.getAttribute('data-type');

      const planSelect = document.getElementById('planSelect');
      if (currentServiceType === 'hogar') {
        planSelect.innerHTML = `
          <option value="300 Mbps Simétrico (Ideal streaming y teletrabajo)">300 Mbps 100% Fibra Óptica Simétrica</option>
          <option value="500 Mbps Simétrico (Familias y gamers)">500 Mbps Alta Velocidad Gamer</option>
          <option value="1000 Mbps Simétrico (Ultra velocidad / Negocios)" selected>1000 Mbps (1 Gbps) Máxima Potencia</option>
        `;
      } else if (currentServiceType === 'empresa') {
        planSelect.innerHTML = `
          <option value="Plan Negocio 500 Mbps Simétrico + IP Fija">Plan Negocio 500 Mbps + IP Fija</option>
          <option value="Enlace Dedicado Simétrico 1 Gbps Corporativo" selected>Enlace Dedicado 1 Gbps Corporativo</option>
          <option value="Solución Integral Telefonía IP + Fibra Empresas">Telefonía IP + Fibra PYME</option>
        `;
      } else {
        planSelect.innerHTML = `
          <option value="Atención de Averías Urgentes 24/7">Atención de Averías Urgentes</option>
          <option value="Instalación y Cableado Estructurado">Instalación y Cableado de Red</option>
          <option value="Mantenimiento Preventivo de Planta">Mantenimiento de Red / Fibra</option>
        `;
      }
    });
  });

  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const city = document.getElementById('citySelect').value;
      const plan = document.getElementById('planSelect').value;
      const name = document.getElementById('clientName').value.trim();
      const phone = document.getElementById('clientPhone').value.trim();

      const whatsappNumber = '51922694968';
      const message = `Hola KMT Internet Solución, mi nombre es *${name}*.

Deseo cotizar:
📌 *Tipo de Servicio:* ${currentServiceType.toUpperCase()}
🏙️ *Ciudad / Sede:* ${city}
⚡ *Plan / Detalle:* ${plan}
📞 *Teléfono:* ${phone}

Vengo de la página web de KMT Internet Solución (Aliado de Visual Connections). ¿Podrían brindarme asesoría y validar mi cobertura?`;

      const encodedUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(encodedUrl, '_blank');
    });
  }

  // 5. Sticky Header Effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

});
