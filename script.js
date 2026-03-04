const welcomeEl = document.getElementById("welcomeMessage");

function greetingByTime() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "صباح الخير 🌤️";
  if (hour >= 12 && hour < 17) return "مساء الخير ☀️";
  if (hour >= 17 && hour < 21) return "مساء الخير 🌙";
  return "مساء الخير ✨";
}

if (welcomeEl) {
  welcomeEl.textContent = `${greetingByTime()} أهلًا بك في ماريلاين للأزياء`;
}

const toastEl = document.getElementById("toast");
let toastTimer = null;

function toast(msg) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2200);
}

const subscribeBtn = document.getElementById("subscribeBtn");
const subscribeMessage = document.getElementById("subscribeMessage");

if (subscribeBtn && subscribeMessage) {
  subscribeBtn.addEventListener("click", () => {
    subscribeMessage.style.display = "block";
    toast("تم الاشتراك بنجاح 💖");
  });
}

const cartBtn = document.getElementById("cartBtn");
const cartCountEl = document.getElementById("cartCount");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartClose = document.getElementById("cartClose");
const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");

let cartCount = 0;
let cartItems = [];

function openCart() {
  if (!cartDrawer || !cartOverlay) return;
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("open");
}

function closeCart() {
  if (!cartDrawer || !cartOverlay) return;
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("open");
}

function renderCart() {
  if (!cartItemsEl || !cartTotalEl || !cartCountEl) return;

  cartCountEl.textContent = String(cartCount);

  if (cartItems.length === 0) {
    cartItemsEl.innerHTML = `<div class="empty">سلتك فارغة الآن.</div>`;
    cartTotalEl.textContent = "0 ر.س";
    return;
  }

  cartItemsEl.innerHTML = cartItems
    .map(
      (item) => `
      <div class="cart-item">
        <img class="cart-thumb" src="${item.img}" alt="${item.name}">
        <div class="cart-info">
          <div class="cart-name">${item.name}</div>
          <div class="cart-meta">المقاس: ${item.size} — ${item.price.toLocaleString("ar-SA")} ر.س</div>
        </div>
      </div>
    `
    )
    .join("");

  const total = cartItems.reduce((sum, i) => sum + i.price, 0);
  cartTotalEl.textContent = `${total.toLocaleString("ar-SA")} ر.س`;
}

function getSelectedSize(groupName) {
  const checked = document.querySelector(`input[name="${groupName}"]:checked`);
  return checked ? checked.value : "";
}

document.querySelectorAll("[data-addcart]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const name = btn.getAttribute("data-name");
    const price = Number(btn.getAttribute("data-price"));
    const img = btn.getAttribute("data-img");
    const group = btn.getAttribute("data-sizegroup");
    const size = getSelectedSize(group);

    if (!size) {
      toast("اختاري المقاس أولًا (S / M / L / XL)");
      return;
    }

    cartItems.push({ name, price, img, size });
    cartCount += 1;
    renderCart();
    openCart();
    toast("تمت الإضافة للسلة ✅");
  });
});

if (cartBtn) cartBtn.addEventListener("click", openCart);
if (cartClose) cartClose.addEventListener("click", closeCart);
if (cartOverlay) cartOverlay.addEventListener("click", closeCart);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeCart();
    closeLightbox();
  }
});

renderCart();

const lightbox = document.getElementById("lightbox");
const lightboxOverlay = document.getElementById("lightboxOverlay");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");

function openLightbox(img, title) {
  if (!lightbox || !lightboxImg || !lightboxTitle) return;
  lightboxImg.src = img;
  lightboxTitle.textContent = title || "";
  lightbox.classList.add("open");
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("open");
}

document.querySelectorAll("[data-lightbox]").forEach((btn) => {
  btn.addEventListener("click", () => {
    openLightbox(btn.getAttribute("data-img"), btn.getAttribute("data-title"));
  });
});

if (lightboxOverlay) lightboxOverlay.addEventListener("click", closeLightbox);
if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);