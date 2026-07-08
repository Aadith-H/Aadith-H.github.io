/* ================================
   SCROLL REVEAL ANIMATIONS
================================ */

const revealElements = document.querySelectorAll(
  ".reveal-up, .reveal-left, .reveal-right"
);

function revealOnScroll() {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 95) {
      element.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


/* ================================
   MOBILE MENU
================================ */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}


/* ================================
   EPIC PCB VIA CURSOR
================================ */

const cursor = document.getElementById("customCursor");
const cursorVia = document.querySelector(".cursor-via");
const cursorRing = document.querySelector(".cursor-ring");
const cursorLabel = document.getElementById("cursorLabel");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let ringX = mouseX;
let ringY = mouseY;

let lastTrailTime = 0;
let lastTrailX = mouseX;
let lastTrailY = mouseY;

document.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;

  document.body.style.setProperty("--mouse-x", `${mouseX}px`);
  document.body.style.setProperty("--mouse-y", `${mouseY}px`);

  if (cursorVia) {
    cursorVia.style.left = `${mouseX}px`;
    cursorVia.style.top = `${mouseY}px`;
  }

  if (cursorLabel) {
    cursorLabel.style.left = `${mouseX}px`;
    cursorLabel.style.top = `${mouseY - 48}px`;
  }

  const now = Date.now();
  const distance = Math.hypot(mouseX - lastTrailX, mouseY - lastTrailY);

  if (now - lastTrailTime > 400 && distance > 22 && !cursor?.classList.contains("cursor-hover")) {
if (document.elementFromPoint(mouseX, mouseY)?.closest("#hero")) {
  createTraceTrail(lastTrailX, lastTrailY, mouseX, mouseY);
  createViaTrail(mouseX, mouseY);
}
    lastTrailTime = now;
    lastTrailX = mouseX;
    lastTrailY = mouseY;
    function createTraceTrail(x1, y1, x2, y2) {
  const trace = document.createElement("div");
  trace.className = "trail-trace";

  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy);
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;

  trace.style.left = `${x1}px`;
  trace.style.top = `${y1}px`;
  trace.style.width = `${length}px`;
  trace.style.transform = `rotate(${angle}deg)`;

  document.body.appendChild(trace);

  setTimeout(() => {
    trace.remove();
  }, 5600);
}
  }
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.16;
  ringY += (mouseY - ringY) * 0.16;

  if (cursorRing) {
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
  }

  requestAnimationFrame(animateCursor);
}

animateCursor();

function createViaTrail(x, y) {
  const via = document.createElement("div");
  via.className = "via-trail";
  via.style.left = `${x}px`;
  via.style.top = `${y}px`;

  const size = 18 + Math.random() * 8;
  via.style.width = `${size}px`;
  via.style.height = `${size}px`;

  document.body.appendChild(via);

  setTimeout(() => {
    via.remove();
  }, 5500);
}

function setCursorLabel(text) {
  if (!cursor || !cursorLabel) return;

  if (text) {
    cursorLabel.textContent = text;
    cursor.classList.add("cursor-hover");
  } else {
    cursorLabel.textContent = "";
    cursor.classList.remove("cursor-hover");
  }
}

const hoverTargets = [
  { selector: ".gallery-card img", label: "ZOOM" },
  { selector: ".carousel img", label: "ZOOM" },
  { selector: ".video-frame", label: "VIEW" },
  { selector: ".download-button:not(.disabled)", label: "DOWNLOAD" },
  { selector: ".info-card", label: "EXPLORE" },
  { selector: ".spec-card", label: "SPEC" },
  { selector: ".journal-card", label: "NOTE" },
  { selector: ".timeline-item", label: "STEP" },
  { selector: "a[href^='mailto']", label: "EMAIL" },
  { selector: "a[href*='github']", label: "CODE" },
  { selector: ".button", label: "GO" },
  { selector: "button", label: "CLICK" }
];

hoverTargets.forEach((target) => {
  document.querySelectorAll(target.selector).forEach((element) => {
    element.addEventListener("mouseenter", () => {
      setCursorLabel(target.label);
    });

    element.addEventListener("mouseleave", () => {
      setCursorLabel("");
    });
  });
});

document.addEventListener("mousedown", () => {
  if (cursorRing) {
    cursorRing.style.width = "86px";
    cursorRing.style.height = "86px";
  }
});

document.addEventListener("mouseup", () => {
  if (cursorRing) {
    cursorRing.style.width = "";
    cursorRing.style.height = "";
  }
});
/* ================================
   CARD SPOTLIGHT EFFECT
================================ */

const spotlightCards = document.querySelectorAll(
  ".info-card, .spec-card, .journal-card"
);

spotlightCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  });
});

const hero = document.getElementById("hero");
let heroHover = false;

hero.addEventListener("mouseenter", () => {
    heroHover = true;
});

hero.addEventListener("mouseleave", () => {
    heroHover = false;
});


/* ================================
   INTRUDER ALARM CAROUSEL
================================ */

const intruderImages = [
  "images/intruder-1.png",
  "images/intruder-2.png",
  "images/intruder-3.png",
  "images/intruder-4.png"
];

let currentIntruderImage = 0;

const carouselImage = document.getElementById("intruderCarousel");
const carouselBox = document.getElementById("intruderCarouselBox");
const dots = document.querySelectorAll(".dot");
const nextButton = document.getElementById("nextIntruder");
const prevButton = document.getElementById("prevIntruder");

function showIntruderImage(index) {
  if (!carouselImage) return;

  currentIntruderImage = (index + intruderImages.length) % intruderImages.length;

  carouselImage.classList.add("fade-out");

  setTimeout(() => {
    carouselImage.src = intruderImages[currentIntruderImage];

    dots.forEach((dot) => dot.classList.remove("active"));

    if (dots[currentIntruderImage]) {
      dots[currentIntruderImage].classList.add("active");
    }

    carouselImage.classList.remove("fade-out");
  }, 250);
}

function nextIntruderImage() {
  showIntruderImage(currentIntruderImage + 1);
}

function previousIntruderImage() {
  showIntruderImage(currentIntruderImage - 1);
}

let carouselTimer = setInterval(nextIntruderImage, 1500);

function resetCarouselTimer() {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(nextIntruderImage, 1500);
}

if (nextButton) {
  nextButton.addEventListener("click", () => {
    nextIntruderImage();
    resetCarouselTimer();
  });
}

if (prevButton) {
  prevButton.addEventListener("click", () => {
    previousIntruderImage();
    resetCarouselTimer();
  });
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const slideIndex = Number(dot.dataset.slide);
    showIntruderImage(slideIndex);
    resetCarouselTimer();
  });
});

if (carouselBox) {
  carouselBox.addEventListener("mouseenter", () => {
    clearInterval(carouselTimer);
  });

  carouselBox.addEventListener("mouseleave", () => {
    resetCarouselTimer();
  });
}


/* ================================
   LIGHTBOX GALLERY
================================ */

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

const galleryImages = Array.from(
  document.querySelectorAll(".gallery-card img, .carousel img")
);

let currentLightboxIndex = 0;

function openLightbox(index) {
  if (!lightbox || !lightboxImage) return;

  currentLightboxIndex = index;
  lightboxImage.src = galleryImages[currentLightboxIndex].src;
  lightbox.classList.add("active");
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;

  lightbox.classList.remove("active");
  lightboxImage.src = "";
}

function showLightboxImage(index) {
  if (!lightboxImage || galleryImages.length === 0) return;

  currentLightboxIndex = (index + galleryImages.length) % galleryImages.length;
  lightboxImage.src = galleryImages[currentLightboxIndex].src;
}

galleryImages.forEach((image, index) => {
  image.addEventListener("click", () => {
    openLightbox(index);
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightboxPrev) {
  lightboxPrev.addEventListener("click", (event) => {
    event.stopPropagation();
    showLightboxImage(currentLightboxIndex - 1);
  });
}

if (lightboxNext) {
  lightboxNext.addEventListener("click", (event) => {
    event.stopPropagation();
    showLightboxImage(currentLightboxIndex + 1);
  });
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}


/* ================================
   KEYBOARD CONTROLS
================================ */

document.addEventListener("keydown", (event) => {
  const lightboxIsOpen = lightbox && lightbox.classList.contains("active");

  if (lightboxIsOpen) {
    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowRight") {
      showLightboxImage(currentLightboxIndex + 1);
    }

    if (event.key === "ArrowLeft") {
      showLightboxImage(currentLightboxIndex - 1);
    }

    return;
  }

  if (event.key === "ArrowRight") {
    nextIntruderImage();
    resetCarouselTimer();
  }

  if (event.key === "ArrowLeft") {
    previousIntruderImage();
    resetCarouselTimer();
  }
});

/* ================================
   BOOT SCREEN
================================ */

const bootScreen = document.getElementById("bootScreen");

window.addEventListener("load", () => {
  setTimeout(() => {
    if (bootScreen) {
      bootScreen.classList.add("hide");
    }
  }, 1300);
});

/* ================================
   GENERATED PCB TRACE BACKGROUND
   CLEAN 45 DEGREE NON-INTERSECTING VERSION
================================ */

const pcbCanvas = document.getElementById("pcbCanvas");

if (pcbCanvas) {
  const ctx = pcbCanvas.getContext("2d");

  let traces = [];
  let pulses = [];
  let components = [];
  let usedSegments = [];

  const gridSize = 60;

  // Only horizontal and 45 degree routing
  const directions = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 1, y: 1 },
    { x: -1, y: 1 },
    { x: 1, y: -1 },
    { x: -1, y: -1 }
  ];

  function resizePCB() {
    pcbCanvas.width = pcbCanvas.offsetWidth;
    pcbCanvas.height = pcbCanvas.offsetHeight;
    generatePCB();
  }

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function snap(value) {
    return Math.round(value / gridSize) * gridSize;
  }

  function dotProduct(a, b) {
    return a.x * b.x + a.y * b.y;
  }

  function ccw(a, b, c) {
    return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x);
  }

  function segmentsIntersect(s1, s2) {
    const a = s1.a;
    const b = s1.b;
    const c = s2.a;
    const d = s2.b;

    // allow shared endpoints
    if (
      (a.x === c.x && a.y === c.y) ||
      (a.x === d.x && a.y === d.y) ||
      (b.x === c.x && b.y === c.y) ||
      (b.x === d.x && b.y === d.y)
    ) {
      return false;
    }

    return ccw(a, c, d) !== ccw(b, c, d) && ccw(a, b, c) !== ccw(a, b, d);
  }

  function wouldIntersect(newSegment) {
    return usedSegments.some((segment) => segmentsIntersect(segment, newSegment));
  }

  function chooseNextDirection(lastDirection) {
    const candidates = directions.filter((dir) => {
      if (!lastDirection) return true;

      const reverse = dir.x === -lastDirection.x && dir.y === -lastDirection.y;
      const tooSharp = dotProduct(dir, lastDirection) < 0;

      return !reverse && !tooSharp;
    });

    return candidates[Math.floor(random(0, candidates.length))];
  }

  function generateSingleTrace(width, height) {
    let x = snap(random(-100, width + 100));
    let y = snap(random(-100, height + 100));

    const points = [{ x, y }];
    const localSegments = [];
    let lastDirection = null;

    const segmentCount = Math.floor(random(3, 7));

    for (let i = 0; i < segmentCount; i++) {
      let accepted = false;

      for (let attempt = 0; attempt < 12; attempt++) {
        const direction = chooseNextDirection(lastDirection);
        const length = Math.floor(random(1, 4)) * gridSize;

        const nextX = Math.max(-140, Math.min(width + 140, x + direction.x * length));
        const nextY = Math.max(-140, Math.min(height + 140, y + direction.y * length));

        const newSegment = {
          a: { x, y },
          b: { x: nextX, y: nextY }
        };

        if (!wouldIntersect(newSegment)) {
          points.push({ x: nextX, y: nextY });
          localSegments.push(newSegment);

          x = nextX;
          y = nextY;
          lastDirection = direction;
          accepted = true;
          break;
        }
      }

      if (!accepted) break;
    }

    if (points.length < 3) {
      return null;
    }

    return { points, localSegments };
  }

  function generatePCB() {
    traces = [];
    pulses = [];
    components = [];
    usedSegments = [];

    const width = pcbCanvas.width;
    const height = pcbCanvas.height;

    let tries = 0;

    while (traces.length < 26 && tries < 220) {
      const trace = generateSingleTrace(width, height);
      tries++;

      if (!trace) continue;

      traces.push(trace.points);
      usedSegments.push(...trace.localSegments);

      if (Math.random() > 0.35) {
        pulses.push({
          traceIndex: traces.length - 1,
          progress: Math.random(),
          speed: random(0.0025, 0.006)
        });
      }
    }

    generateComponents();
  }

  function generateComponents() {
    for (let i = 0; i < 10; i++) {
      components.push({
        x: snap(random(0, pcbCanvas.width)),
        y: snap(random(0, pcbCanvas.height)),
        w: random(24, 46),
        h: random(8, 18),
        label: Math.random() > 0.5 ? "R" + (i + 1) : "C" + (i + 1)
      });
    }
  }

  function drawVia(x, y, radius = 6) {
    ctx.save();

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(0, 200, 255, 0.7)";
    ctx.lineWidth = 2;
    ctx.shadowColor = "rgba(0, 200, 255, 0.85)";
    ctx.shadowBlur = 14;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, radius * 0.35, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(7, 11, 16, 0.95)";
    ctx.fill();

    ctx.restore();
  }

  function drawTrace(points) {
    ctx.save();

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }

   ctx.strokeStyle = `rgba(0, 200, 255, ${0.09 + Math.random() * 0.08})`;
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
   ctx.shadowColor = `rgba(0, 200, 255, ${0.12 + Math.random() * 0.12})`;
    ctx.shadowBlur = 5;
    ctx.stroke();

    ctx.strokeStyle = "rgba(255, 255, 255, 0.10)";
    ctx.lineWidth = 1;
    ctx.shadowBlur = 0;
    ctx.stroke();

    points.forEach((point) => drawVia(point.x, point.y));

    ctx.restore();
  }

  function drawComponents() {
    ctx.save();

    components.forEach((component) => {
      ctx.strokeStyle = "rgba(0, 200, 255, 0.22)";
      ctx.lineWidth = 1;
      ctx.shadowColor = "rgba(0, 200, 255, 0.3)";
      ctx.shadowBlur = 8;

      ctx.strokeRect(
        component.x - component.w / 2,
        component.y - component.h / 2,
        component.w,
        component.h
      );

      ctx.fillStyle = "rgba(0, 200, 255, 0.22)";
      ctx.font = "10px Arial";
      ctx.fillText(
        component.label,
        component.x - component.w / 2,
        component.y - component.h / 2 - 5
      );
    });

    ctx.restore();
  }

  function getPointOnTrace(points, progress) {
    const segments = [];

    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i];
      const b = points[i + 1];
      const length = Math.hypot(b.x - a.x, b.y - a.y);

      if (length > 0) {
        segments.push({ a, b, length });
      }
    }

    const totalLength = segments.reduce((sum, segment) => sum + segment.length, 0);
    let target = progress * totalLength;

    for (const segment of segments) {
      if (target <= segment.length) {
        const t = target / segment.length;

        return {
          x: segment.a.x + (segment.b.x - segment.a.x) * t,
          y: segment.a.y + (segment.b.y - segment.a.y) * t
        };
      }

      target -= segment.length;
    }

    return points[points.length - 1];
  }

  function drawPulses() {
    pulses.forEach((pulse) => {
      const points = traces[pulse.traceIndex];
      const point = getPointOnTrace(points, pulse.progress);

      ctx.save();

      ctx.beginPath();
      ctx.arc(point.x, point.y, 5.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 230, 255, 0.95)";
      ctx.shadowColor = "rgba(0, 230, 255, 1)";
      ctx.shadowBlur = 24;
      ctx.fill();

      ctx.restore();

      pulse.progress += pulse.speed;

      if (pulse.progress > 1) {
        pulse.progress = 0;
      }
    });
  }

  function animatePCB() {
    ctx.clearRect(0, 0, pcbCanvas.width, pcbCanvas.height);

    traces.forEach(drawTrace);
    drawComponents();
    drawPulses();

    requestAnimationFrame(animatePCB);
  }

  window.addEventListener("resize", resizePCB);

  resizePCB();
  animatePCB();
}