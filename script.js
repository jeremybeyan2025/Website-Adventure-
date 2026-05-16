const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const root = document.documentElement;
const cursorLight = document.getElementById("cursorLight");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

window.addEventListener("pointermove", (event) => {
  const x = event.clientX;
  const y = event.clientY;
  root.style.setProperty("--mx", `${(x / window.innerWidth) * 100}%`);
  root.style.setProperty("--my", `${(y / window.innerHeight) * 100}%`);

  if (cursorLight && !prefersReducedMotion) {
    cursorLight.style.left = `${x}px`;
    cursorLight.style.top = `${y}px`;
  }
}, { passive: true });

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14, rootMargin: "0px 0px -60px 0px" }
);

document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (prefersReducedMotion || window.innerWidth < 900) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateX(${y * -5}deg) rotateY(${x * 7}deg) translateY(-4px) translateZ(14px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

const lab = document.querySelector(".lab");
const labPanels = Array.from(document.querySelectorAll(".lab-panel"));
const meterBars = Array.from(document.querySelectorAll(".step-meter span"));
const screenCards = Array.from(document.querySelectorAll(".screen-card"));
const heroCube = document.getElementById("heroCube");
let latestScroll = window.scrollY;
let ticking = false;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateScrollEffects() {
  const scrollY = latestScroll;

  if (heroCube && !prefersReducedMotion) {
    heroCube.style.transform = `rotateX(${scrollY * 0.014}deg) rotateY(${scrollY * 0.024}deg) translateZ(${Math.min(scrollY * 0.035, 72)}px)`;
  }

  if (lab && labPanels.length) {
    const rect = lab.getBoundingClientRect();
    const scrollable = Math.max(lab.offsetHeight - window.innerHeight, 1);
    const progress = clamp(-rect.top / scrollable, 0, 1);
    const activeIndex = Math.min(labPanels.length - 1, Math.floor(progress * labPanels.length));

    labPanels.forEach((panel, index) => {
      const distance = index - activeIndex;
      panel.classList.toggle("active", index === activeIndex);

      if (!prefersReducedMotion && window.innerWidth > 1060) {
        const opacity = index === activeIndex ? 1 : Math.max(0, 0.16 - Math.abs(distance) * 0.07);
        const blur = index === activeIndex ? 0 : Math.min(14, Math.abs(distance) * 7);
        const translateX = distance * 86;
        const translateZ = index === activeIndex ? 150 : -210 - Math.abs(distance) * 82;
        const rotateY = distance * -18;
        const scale = index === activeIndex ? 1 : 0.76;
        panel.style.opacity = opacity;
        panel.style.filter = `blur(${blur}px)`;
        panel.style.transform = `translateY(-50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
      }
    });

    meterBars.forEach((bar, index) => {
      bar.classList.toggle("active", index === activeIndex);
    });

    if (!prefersReducedMotion && window.innerWidth > 1060) {
      screenCards.forEach((screen, index) => {
        const offset = (progress - index * 0.08) * 98;
        screen.style.transform = `translate3d(${30 + index * 60}px, ${-120 + index * 92 - offset}px, ${130 - index * 60 + offset * 0.28}px)`;
      });
    }
  }
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateScrollEffects();
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener("scroll", () => {
  latestScroll = window.scrollY;
  requestTick();
}, { passive: true });

window.addEventListener("resize", requestTick);

const leadForm = document.getElementById("leadForm");
const formNote = document.getElementById("formNote");

if (leadForm) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(leadForm);
    const name = data.get("name") || "";
    const business = data.get("business") || "";
    const email = data.get("email") || "";
    const service = data.get("service") || "";
    const message = data.get("message") || "";

    const subject = encodeURIComponent(`Website Adventure Premium Build - ${business || name}`);
    const body = encodeURIComponent(
      `New Website Adventure premium build request\n\nName: ${name}\nBusiness: ${business}\nEmail: ${email}\nNeed: ${service}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:jeremybeyan2025@gmail.com?subject=${subject}&body=${body}`;
    if (formNote) formNote.textContent = "Your email app should open with the project details prefilled.";
  });
}

const canvas = document.getElementById("spaceCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;
let particles = [];
let animationFrame;

function resizeCanvas() {
  if (!canvas || !ctx) return;
  const ratio = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function createParticles() {
  const count = Math.min(90, Math.floor(window.innerWidth / 16));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    z: Math.random() * 1 + 0.2,
    vx: (Math.random() - 0.5) * 0.12,
    vy: (Math.random() - 0.5) * 0.12,
    r: Math.random() * 1.25 + 0.35,
    a: Math.random() * 0.34 + 0.08,
  }));
}

function drawParticles() {
  if (!canvas || !ctx || prefersReducedMotion) return;
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach((p, i) => {
    p.x += p.vx * p.z;
    p.y += p.vy * p.z;

    if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
    if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r * p.z, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(215,183,116,${p.a})`;
    ctx.fill();

    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 105) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(246,241,231,${0.05 * (1 - dist / 105)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  });

  animationFrame = requestAnimationFrame(drawParticles);
}

function initCanvas() {
  if (!canvas || !ctx || prefersReducedMotion) return;
  resizeCanvas();
  createParticles();
  drawParticles();
}

window.addEventListener("resize", () => {
  if (animationFrame) cancelAnimationFrame(animationFrame);
  resizeCanvas();
  createParticles();
  drawParticles();
});

initCanvas();
updateScrollEffects();
