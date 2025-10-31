let slides = document.querySelectorAll(".slide");
let current = 0;
let interval;
const bgCanvas = document.getElementById("bgCanvas");
const ctx = bgCanvas.getContext("2d");
const bgAudio = document.getElementById("bgAudio");
const toggleBtn = document.getElementById("toggleAudio");
const restartBtn = document.getElementById("restartBtn");
const introSlide = document.getElementById("introSlide");
const celebrationVideo = document.getElementById("celebrationVideo");

bgCanvas.width = window.innerWidth;
bgCanvas.height = window.innerHeight;

// --- Fireworks effect ---
const fireworks = [];
document.addEventListener("click", (e) => {
  playAudio();
  fireworks.push({ x: e.clientX, y: e.clientY, life: 0 });
});

function animateFireworks() {
  ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  for (let f of fireworks) {
    f.life += 2;
    for (let i = 0; i < 10; i++) {
      const angle = (Math.PI * 2 * i) / 10;
      const x = f.x + Math.cos(angle) * f.life * 3;
      const y = f.y + Math.sin(angle) * f.life * 3;
      ctx.fillStyle = `hsl(${f.life * 10}, 100%, 60%)`;
      ctx.fillRect(x, y, 3, 3);
    }
  }
  requestAnimationFrame(animateFireworks);
}
animateFireworks();

// --- Music ---
function playAudio() {
  bgAudio.play().catch(() => {});
}
toggleBtn.onclick = () => {
  if (bgAudio.paused) {
    bgAudio.play();
    toggleBtn.textContent = "Pause Music ⏸";
  } else {
    bgAudio.pause();
    toggleBtn.textContent = "Play Music ▶";
  }
};

// --- Slideshow ---
function nextSlide() {
  slides[current].classList.remove("active");
  current = (current + 1) % slides.length;
  slides[current].classList.add("active");

  // Stop auto-slide and play video when final page appears
  if (current === slides.length - 1) {
    clearInterval(interval);
    celebrationVideo.play().catch(() => {});
  }
}

function startSlideshow() {
  slides[0].classList.remove("active");
  slides[1].classList.add("active");
  current = 1;
  interval = setInterval(nextSlide, 7000);
}

introSlide.addEventListener("click", () => {
  startSlideshow();
  playAudio();
});

restartBtn.addEventListener("click", () => {
  slides.forEach((s) => s.classList.remove("active"));
  slides[0].classList.add("active");
  current = 0;
  clearInterval(interval);
});
