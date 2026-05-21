const opening = document.getElementById("opening");
const openBtn = document.getElementById("openBtn");
const mainContent = document.getElementById("mainContent");
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const navbar = document.getElementById("navbar");
const toast = document.getElementById("toast");

const params = new URLSearchParams(window.location.search);
const guest = params.get("to");

if (guest) {
  document.getElementById("guestName").textContent = guest;
}

function playMusic() {
  bgMusic.volume = 0.45;

  bgMusic.play()
    .then(() => {
      musicBtn.classList.add("playing");
    })
    .catch(() => {
      musicBtn.classList.remove("playing");
    });
}

openBtn.addEventListener("click", () => {
  opening.classList.add("hide");
  mainContent.classList.add("show");
  playMusic();

  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 400);
});

musicBtn.addEventListener("click", () => {
  if (bgMusic.paused) {
    playMusic();
  } else {
    bgMusic.pause();
    musicBtn.classList.remove("playing");
  }
});

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.15
});

document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => {
  observer.observe(el);
});

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 1800);
  });
}