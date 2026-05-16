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

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16, rootMargin: "0px 0px -50px 0px" }
);

document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

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

    const subject = encodeURIComponent(`Level Up Project Request - ${business || name}`);
    const body = encodeURIComponent(
      `New Level Up project request\n\nName: ${name}\nBusiness: ${business}\nEmail: ${email}\nNeed: ${service}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:jeremybeyan2025@gmail.com?subject=${subject}&body=${body}`;

    if (formNote) {
      formNote.textContent = "Your email app should open with the project request prefilled.";
    }
  });
}
