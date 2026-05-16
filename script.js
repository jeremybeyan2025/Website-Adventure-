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

function injectSpinCard() {
  const hero = document.querySelector(".hero");
  const work = document.querySelector(".work");
  if (!hero || !work || document.querySelector(".spin-showcase")) return;

  const style = document.createElement("style");
  style.textContent = `
    .spin-showcase {
      position: relative;
      padding: clamp(64px, 10vw, 120px) 20px;
      overflow: hidden;
      color: #fff;
      background:
        radial-gradient(circle at 70% 18%, rgba(255,30,45,.24), transparent 26%),
        linear-gradient(135deg, #050505 0%, #101010 48%, #050505 100%);
      border-top: 2px solid #0a0a0a;
      border-bottom: 2px solid #0a0a0a;
    }

    .spin-showcase::before {
      content: "";
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px);
      background-size: 78px 78px;
      opacity: .28;
      transform: perspective(700px) rotateX(58deg) translateY(-160px) scale(1.5);
      pointer-events: none;
    }

    .spin-showcase-inner {
      position: relative;
      z-index: 2;
      width: min(1240px, 100%);
      margin: 0 auto;
      display: grid;
      grid-template-columns: .85fr 1.15fr;
      align-items: center;
      gap: clamp(28px, 5vw, 70px);
    }

    .spin-copy small {
      display: block;
      margin-bottom: 18px;
      color: #ff1e2d;
      font-weight: 950;
      letter-spacing: .08em;
      text-transform: uppercase;
    }

    .spin-copy h2 {
      margin: 0 0 22px;
      max-width: 620px;
      color: #fff;
      font-size: clamp(46px, 7vw, 108px);
      line-height: .82;
      font-weight: 950;
      letter-spacing: -.105em;
      text-transform: uppercase;
    }

    .spin-copy p {
      max-width: 520px;
      margin: 0;
      color: rgba(255,255,255,.72);
      font-size: 18px;
    }

    .spin-card-stage {
      min-height: 520px;
      display: grid;
      place-items: center;
      perspective: 1200px;
      -webkit-perspective: 1200px;
      transform-style: preserve-3d;
      -webkit-transform-style: preserve-3d;
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
    }

    .spin-card {
      position: relative;
      width: min(430px, 86vw);
      aspect-ratio: 3 / 4;
      transform-style: preserve-3d;
      -webkit-transform-style: preserve-3d;
      transform: rotateX(-8deg) rotateY(-18deg);
      -webkit-transform: rotateX(-8deg) rotateY(-18deg);
      transition: transform .18s ease-out;
      cursor: grab;
      filter: drop-shadow(0 48px 70px rgba(0,0,0,.45));
    }

    .spin-card.is-dragging {
      cursor: grabbing;
      transition: none;
    }

    .spin-face {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      padding: 28px;
      border: 2px solid rgba(255,255,255,.25);
      border-radius: 28px;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      transform-style: preserve-3d;
      -webkit-transform-style: preserve-3d;
      background: #fff;
      color: #0a0a0a;
    }

    .spin-front {
      transform: rotateY(0deg) translateZ(2px);
      -webkit-transform: rotateY(0deg) translateZ(2px);
      background:
        linear-gradient(180deg, rgba(255,255,255,.2), rgba(255,255,255,.88)),
        url("24AB994A-CD12-4F26-8F1D-054BBB297212.png") center/cover;
    }

    .spin-front::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,.9), rgba(255,255,255,.3) 46%, rgba(255,30,45,.24));
      pointer-events: none;
    }

    .spin-back {
      transform: rotateY(180deg) translateZ(2px);
      -webkit-transform: rotateY(180deg) translateZ(2px);
      color: #fff;
      background:
        linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,.86)),
        url("BE64B3A0-2856-4C7D-9326-55E9B7140168.png") center/cover;
    }

    .spin-face > * {
      position: relative;
      z-index: 2;
      transform: translateZ(8px);
      -webkit-transform: translateZ(8px);
    }

    .spin-logo-row {
      display: flex;
      align-items: center;
      gap: 13px;
    }

    .spin-badge {
      width: 52px;
      height: 52px;
      display: grid;
      place-items: center;
      border-radius: 14px;
      color: #fff;
      background: #0a0a0a;
      font-size: 22px;
      font-weight: 950;
      letter-spacing: -.08em;
    }

    .spin-logo-text strong {
      display: block;
      color: #ff1e2d;
      font-size: 28px;
      font-weight: 950;
      line-height: .86;
      letter-spacing: -.07em;
      text-transform: uppercase;
    }

    .spin-logo-text span {
      display: block;
      margin-top: 8px;
      color: #0a0a0a;
      font-size: 13px;
      font-weight: 850;
      letter-spacing: .16em;
      text-transform: uppercase;
    }

    .spin-front h3,
    .spin-back h3 {
      margin: 0;
      font-size: clamp(44px, 7vw, 76px);
      line-height: .82;
      font-weight: 950;
      letter-spacing: -.105em;
      text-transform: uppercase;
    }

    .spin-front h3 span,
    .spin-back h3 span {
      color: #ff1e2d;
    }

    .spin-hint {
      display: inline-flex;
      width: fit-content;
      padding: 12px 14px;
      border: 2px solid #0a0a0a;
      color: #0a0a0a;
      background: rgba(255,255,255,.62);
      font-size: 12px;
      font-weight: 950;
      text-transform: uppercase;
    }

    .spin-services {
      display: grid;
      gap: 12px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .spin-services li {
      display: flex;
      justify-content: space-between;
      gap: 18px;
      padding: 14px 0;
      border-bottom: 1px solid rgba(255,255,255,.22);
      font-weight: 950;
      text-transform: uppercase;
    }

    .spin-services span {
      color: #ff1e2d;
    }

    @media (max-width: 900px) {
      .spin-showcase-inner {
        grid-template-columns: 1fr;
      }
      .spin-card-stage {
        min-height: 470px;
      }
    }

    @media (max-width: 760px) {
      .spin-showcase {
        padding: 58px 16px 70px;
      }
      .spin-copy h2 {
        font-size: clamp(46px, 16vw, 78px);
      }
      .spin-card {
        width: min(360px, 90vw);
      }
      .spin-face {
        border-radius: 22px;
        padding: 22px;
      }
      .spin-front h3,
      .spin-back h3 {
        font-size: 48px;
      }
    }
  `;
  document.head.appendChild(style);

  const section = document.createElement("section");
  section.className = "spin-showcase reveal";
  section.innerHTML = `
    <div class="spin-showcase-inner">
      <div class="spin-copy">
        <small>Interactive Brand Card</small>
        <h2>Touch it. Spin it. Level up.</h2>
        <p>A cinematic business card moment for the brand — built to feel tactile, fast, and premium on mobile.</p>
      </div>
      <div class="spin-card-stage" aria-label="Interactive spinning Level Up card">
        <div class="spin-card" id="spinCard" role="button" tabindex="0" aria-label="Touch and drag to spin the Level Up card">
          <div class="spin-face spin-front">
            <div class="spin-logo-row">
              <div class="spin-badge">L↗</div>
              <div class="spin-logo-text"><strong>LEVEL UP</strong><span>Growth Agency</span></div>
            </div>
            <h3>Growth isn’t luck. <span>It’s strategy.</span></h3>
            <div class="spin-hint">Touch + drag to spin</div>
          </div>
          <div class="spin-face spin-back">
            <h3>Built for <span>growth.</span></h3>
            <ul class="spin-services">
              <li><span>01</span> Web Design</li>
              <li><span>02</span> Ad Creation</li>
              <li><span>03</span> Merchant Processing</li>
              <li><span>04</span> Strategy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;

  hero.insertAdjacentElement("afterend", section);
}

injectSpinCard();

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

function setupSpinCard() {
  const card = document.getElementById("spinCard");
  if (!card) return;

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let rotationX = -8;
  let rotationY = -18;
  let moved = false;

  function applyRotation() {
    const transformValue = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    card.style.transform = transformValue;
    card.style.webkitTransform = transformValue;
    card.style.setProperty("--spin-x", `${rotationX}deg`);
    card.style.setProperty("--spin-y", `${rotationY}deg`);
  }

  function start(event) {
    isDragging = true;
    moved = false;
    startX = event.clientX;
    startY = event.clientY;
    card.classList.add("is-dragging");
    card.setPointerCapture?.(event.pointerId);
  }

  function move(event) {
    if (!isDragging) return;
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    if (Math.abs(deltaX) + Math.abs(deltaY) > 6) moved = true;
    rotationY += deltaX * 0.35;
    rotationX -= deltaY * 0.22;
    rotationX = Math.max(-38, Math.min(38, rotationX));
    startX = event.clientX;
    startY = event.clientY;
    applyRotation();
  }

  function end(event) {
    if (!isDragging) return;
    isDragging = false;
    card.classList.remove("is-dragging");
    card.releasePointerCapture?.(event.pointerId);

    if (!moved) {
      rotationY += 180;
      applyRotation();
    }
  }

  card.addEventListener("pointerdown", start);
  card.addEventListener("pointermove", move);
  card.addEventListener("pointerup", end);
  card.addEventListener("pointercancel", end);

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      rotationY += 180;
      applyRotation();
    }
  });

  applyRotation();
}

setupSpinCard();

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
