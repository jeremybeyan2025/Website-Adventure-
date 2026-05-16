const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }
);

revealItems.forEach((item) => revealObserver.observe(item));

const hero = document.querySelector(".hero");
const heroLayers = document.querySelectorAll(".hero-layer");
let pointerX = 0;
let pointerY = 0;
let latestScrollY = window.scrollY;
let ticking = false;

function updateHeroDepth() {
  if (!hero || prefersReducedMotion) return;
  const heroHeight = hero.offsetHeight || 1;
  const progress = Math.min(latestScrollY / heroHeight, 1);

  heroLayers.forEach((layer) => {
    const depth = Number(layer.dataset.depth || 0.1);
    const moveX = pointerX * depth * 24;
    const moveY = pointerY * depth * 18 + progress * depth * 180;
    const scale = 1 + progress * depth * 0.18;
    layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(${scale})`;
  });
}

function requestTick() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateHeroDepth();
      updateStoryCards();
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener("scroll", () => {
  latestScrollY = window.scrollY;
  requestTick();
}, { passive: true });

window.addEventListener("pointermove", (event) => {
  if (prefersReducedMotion) return;
  pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
  pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
  requestTick();
}, { passive: true });

const storySection = document.querySelector(".story");
const storyCards = Array.from(document.querySelectorAll(".story-card"));

function updateStoryCards() {
  if (!storySection || !storyCards.length) return;
  const rect = storySection.getBoundingClientRect();
  const scrollable = Math.max(storySection.offsetHeight - window.innerHeight, 1);
  const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
  const index = Math.min(storyCards.length - 1, Math.floor(progress * storyCards.length));

  storyCards.forEach((card, cardIndex) => {
    const distance = Math.abs(index - cardIndex);
    card.classList.toggle("active", cardIndex === index);

    if (!prefersReducedMotion && window.innerWidth > 1020) {
      const side = cardIndex - index;
      const rotate = side * 8;
      const translateX = side * 54;
      const translateZ = cardIndex === index ? 120 : -160 - distance * 80;
      const scale = cardIndex === index ? 1 : 0.82 - distance * 0.04;
      const opacity = cardIndex === index ? 1 : Math.max(0, 0.24 - distance * 0.12);
      const blur = cardIndex === index ? 0 : Math.min(14, distance * 7);

      card.style.transform = `translate(-50%, -50%) translate3d(${translateX}px, ${side * 24}px, ${translateZ}px) scale(${scale}) rotateX(8deg) rotateY(${rotate}deg)`;
      card.style.opacity = opacity;
      card.style.filter = `blur(${blur}px)`;
    }
  });
}

const tiltZones = document.querySelectorAll(".tilt-zone");

tiltZones.forEach((zone) => {
  zone.addEventListener("pointermove", (event) => {
    if (prefersReducedMotion || window.innerWidth < 900) return;
    const rect = zone.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    zone.style.transform = `perspective(1100px) rotateX(${y * -5}deg) rotateY(${x * 6}deg) translateY(-2px)`;
  });

  zone.addEventListener("pointerleave", () => {
    zone.style.transform = "";
  });
});

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

    const subject = encodeURIComponent(`Website Adventure Project Request - ${business || name}`);
    const body = encodeURIComponent(
      `New Website Adventure project request\n\nName: ${name}\nBusiness: ${business}\nEmail: ${email}\nService Needed: ${service}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:jeremybeyan2025@gmail.com?subject=${subject}&body=${body}`;

    if (formNote) {
      formNote.textContent = "Your email app should open with the project details prefilled.";
    }
  });
}

updateHeroDepth();
updateStoryCards();
