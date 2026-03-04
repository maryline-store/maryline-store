const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");

function toggleMenu() {
  const isOpen = navLinks.classList.toggle("open");
  hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

if (hamburgerBtn && navLinks) {
  hamburgerBtn.addEventListener("click", toggleMenu);
}