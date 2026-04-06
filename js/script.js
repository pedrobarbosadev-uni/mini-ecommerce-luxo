/* ═══════════════════════════════════════════════════════════
   MAISON LUXE — script.js
   Funcionalidades: produtos, carrinho (LocalStorage), filtros,
   modal de produto, animações de scroll, toast, intro screen.
   ═══════════════════════════════════════════════════════════ */

/* ─── DADOS DOS PRODUTOS ───────────────────────────────── */
const PRODUCTS = [
  {
    id: 1,
    name: "Vestido Seda Palazzo",
    category: "vestidos",
    categoryLabel: "Vestido",
    price: 1890,
    oldPrice: 2200,
    badge: "Destaque",
    badgeType: "",
    desc: "Fluido e atemporal, em seda pura com caimento impecável. Ideal para ocasiões especiais.",
    sizes: ["PP", "P", "M", "G"],
    colors: ["#d4c4b5", "#2a1f17", "#c9a96e"],
    bg: "linear-gradient(160deg,#e8ddd2 0%,#d4c4b5 100%)",
    svg: `<svg viewBox="0 0 180 270" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#d4c4b5"/>
        <stop offset="100%" stop-color="#bfaa96"/>
      </linearGradient></defs>
      <path d="M55 30 Q90 18 125 30 L145 80 Q160 160 155 230 L90 250 L25 230 Q20 160 35 80 Z" fill="url(#g1)"/>
      <ellipse cx="90" cy="22" rx="24" ry="16" fill="#c9a96e" opacity=".6"/>
      <path d="M55 30 L35 80" stroke="#c2aa90" stroke-width="1" fill="none"/>
      <path d="M125 30 L145 80" stroke="#c2aa90" stroke-width="1" fill="none"/>
    </svg>`,
  },
  {
    id: 2,
    name: "Blazer Alfaiataria Gold",
    category: "blazers",
    categoryLabel: "Blazer",
    price: 2350,
    oldPrice: null,
    badge: "Novo",
    badgeType: "novo",
    desc: "Estruturado e poderoso, com botões dourados e lapela clássica. Define qualquer silhueta.",
    sizes: ["P", "M", "G", "GG"],
    colors: ["#f5ead8", "#c9a96e", "#2a1f17"],
    bg: "linear-gradient(160deg,#f5ead8 0%,#e8ddd2 100%)",
    svg: `<svg viewBox="0 0 180 270" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 50 L60 30 L90 40 L120 30 L150 50 L160 240 L20 240 Z" fill="#f5ead8"/>
      <path d="M60 30 L90 60 L120 30" fill="#e2c99a" opacity=".5"/>
      <path d="M90 60 L90 240" stroke="#c9a96e" stroke-width="1" fill="none" opacity=".4"/>
      <circle cx="90" cy="130" r="6" fill="#c9a96e"/>
      <circle cx="90" cy="155" r="6" fill="#c9a96e"/>
      <circle cx="90" cy="180" r="6" fill="#c9a96e"/>
      <path d="M30 50 Q20 80 22 140" stroke="#ddd0c0" stroke-width="1" fill="none"/>
      <path d="M150 50 Q160 80 158 140" stroke="#ddd0c0" stroke-width="1" fill="none"/>
    </svg>`,
  },
  {
    id: 3,
    name: "Calça Wide Leg Crepe",
    category: "calcas",
    categoryLabel: "Calça",
    price: 890,
    oldPrice: 1100,
    badge: "Sale",
    badgeType: "promo",
    desc: "Silhueta ampla com toque suave de crepe premium. Conforto e elegância em equilíbrio perfeito.",
    sizes: ["PP", "P", "M", "G", "GG"],
    colors: ["#2a1f17", "#e8ddd2", "#c9a96e"],
    bg: "linear-gradient(160deg,#2a1f17 0%,#5c4a38 100%)",
    svg: `<svg viewBox="0 0 180 270" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 20 L130 20 L125 120 L155 260 L90 260 L90 260 L25 260 L55 120 Z" fill="#3d2e22"/>
      <path d="M50 20 L130 20 L125 60 L55 60 Z" fill="#5c4a38"/>
      <path d="M90 60 L90 260" stroke="#4a3929" stroke-width="1" fill="none"/>
      <path d="M55 60 Q30 130 25 260" stroke="#4a3929" stroke-width="1" fill="none"/>
      <path d="M125 60 Q150 130 155 260" stroke="#4a3929" stroke-width="1" fill="none"/>
    </svg>`,
  },
  {
    id: 4,
    name: "Colar Dourado Minimal",
    category: "acessorios",
    categoryLabel: "Acessório",
    price: 480,
    oldPrice: null,
    badge: "Exclusivo",
    badgeType: "",
    desc: "Colar delicado banhado a ouro 18k. Um toque de sofisticação que complementa qualquer look.",
    sizes: ["Único"],
    colors: ["#c9a96e"],
    bg: "linear-gradient(160deg,#faf7f2 0%,#f5ead8 100%)",
    svg: `<svg viewBox="0 0 180 270" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="90" cy="90" rx="70" ry="65" stroke="#c9a96e" stroke-width="2" fill="none"/>
      <circle cx="90" cy="155" r="14" stroke="#c9a96e" stroke-width="1.5" fill="none"/>
      <path d="M76 155 Q90 140 104 155" stroke="#c9a96e" stroke-width="1" fill="none"/>
      <circle cx="90" cy="90" r="4" fill="#c9a96e" opacity=".6"/>
      <circle cx="40" cy="110" r="3" fill="#c9a96e" opacity=".4"/>
      <circle cx="140" cy="110" r="3" fill="#c9a96e" opacity=".4"/>
    </svg>`,
  },
  {
    id: 5,
    name: "Vestido Midi Linho",
    category: "vestidos",
    categoryLabel: "Vestido",
    price: 1290,
    oldPrice: null,
    badge: "Novo",
    badgeType: "novo",
    desc: "Em linho premium com bordado artesanal na barra. Casual chic para o dia a dia sofisticado.",
    sizes: ["PP", "P", "M", "G"],
    colors: ["#e8ddd2", "#d4c4b5"],
    bg: "linear-gradient(160deg,#f5ead8 0%,#e8ddd2 100%)",
    svg: `<svg viewBox="0 0 180 270" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 20 Q90 12 120 20 L140 60 L150 200 L90 220 L30 200 L40 60 Z" fill="#ede0d0"/>
      <ellipse cx="90" cy="18" rx="18" ry="12" fill="#c9a96e" opacity=".5"/>
      <path d="M40 180 Q90 170 150 180" stroke="#c9a96e" stroke-width="1" fill="none" stroke-dasharray="3,3"/>
      <path d="M35 190 Q90 178 155 190" stroke="#c9a96e" stroke-width=".8" fill="none" stroke-dasharray="2,4"/>
      <path d="M30 200 Q90 186 150 200" stroke="#c9a96e" stroke-width=".8" fill="none" stroke-dasharray="2,4"/>
    </svg>`,
  },
  {
    id: 6,
    name: "Bolsa Couro Nude",
    category: "acessorios",
    categoryLabel: "Acessório",
    price: 3200,
    oldPrice: 3800,
    badge: "Destaque",
    badgeType: "",
    desc: "Em couro legítimo italiano, forro de algodão e ferragens douradas. Atemporal e versátil.",
    sizes: ["Único"],
    colors: ["#d4c4b5", "#c9a96e"],
    bg: "linear-gradient(160deg,#d4c4b5 0%,#bfaa96 100%)",
    svg: `<svg viewBox="0 0 180 270" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="90" width="120" height="110" rx="8" fill="#c9a899"/>
      <path d="M60 90 Q60 55 90 50 Q120 55 120 90" stroke="#b8997f" stroke-width="2" fill="none"/>
      <rect x="72" y="138" width="36" height="20" rx="4" fill="#c9a96e"/>
      <rect x="78" y="144" width="24" height="8" rx="2" fill="#e2c99a"/>
      <line x1="30" y1="110" x2="150" y2="110" stroke="#b8997f" stroke-width=".8" opacity=".5"/>
    </svg>`,
  },
  {
    id: 7,
    name: "Blazer Oversized Creme",
    category: "blazers",
    categoryLabel: "Blazer",
    price: 1750,
    oldPrice: null,
    badge: "Novo",
    badgeType: "novo",
    desc: "Caimento relaxado com ombros marcados. O equilíbrio perfeito entre conforto e estilo.",
    sizes: ["P", "M", "G"],
    colors: ["#faf7f2", "#d4c4b5"],
    bg: "linear-gradient(160deg,#faf7f2 0%,#f0e8df 100%)",
    svg: `<svg viewBox="0 0 180 270" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 55 L65 28 L90 45 L115 28 L160 55 L168 245 L12 245 Z" fill="#f0e8df"/>
      <path d="M65 28 L90 70 L115 28" fill="#e2d8ce" opacity=".7"/>
      <path d="M90 70 L90 245" stroke="#d4c9be" stroke-width="1" fill="none"/>
      <path d="M20 55 Q10 90 12 180" stroke="#e2d8ce" stroke-width="1" fill="none"/>
      <path d="M160 55 Q170 90 168 180" stroke="#e2d8ce" stroke-width="1" fill="none"/>
    </svg>`,
  },
  {
    id: 8,
    name: "Calça Cigarette Creme",
    category: "calcas",
    categoryLabel: "Calça",
    price: 760,
    oldPrice: 950,
    badge: "Sale",
    badgeType: "promo",
    desc: "Corte cigarette de cintura alta em tecido acetinado. Feminina e sofisticada para o trabalho.",
    sizes: ["PP", "P", "M", "G", "GG"],
    colors: ["#faf7f2", "#e8ddd2"],
    bg: "linear-gradient(160deg,#f5ead8 0%,#ede0d0 100%)",
    svg: `<svg viewBox="0 0 180 270" xmlns="http://www.w3.org/2000/svg">
      <path d="M55 18 L125 18 L122 110 L140 265 L90 265 L90 265 L40 265 L58 110 Z" fill="#ede0d0"/>
      <path d="M55 18 L125 18 L123 55 L57 55 Z" fill="#e2d0bc"/>
      <path d="M90 55 L90 265" stroke="#d4c4b5" stroke-width="1" fill="none"/>
    </svg>`,
  },
];

/* ─── ESTADO DA APLICAÇÃO ───────────────────────────────── */
let cart = JSON.parse(localStorage.getItem("maisonLuxeCart")) || [];
let activeCategory = "all";
let selectedSize = "";

/* ─── ELEMENTOS DO DOM ─────────────────────────────────── */
const productsGrid = document.getElementById("productsGrid");
const cartBtn = document.getElementById("cartBtn");
const cartClose = document.getElementById("cartClose");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartTotal = document.getElementById("cartTotal");
const cartEmpty = document.getElementById("cartEmpty");
const cartFooter = document.getElementById("cartFooter");
const clearCartBtn = document.getElementById("clearCartBtn");
const checkoutBtn = document.getElementById("checkoutBtn");
const toast = document.getElementById("toast");
const toastMsg = document.getElementById("toastMsg");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const header = document.getElementById("header");
const modalOverlay = document.getElementById("modalOverlay");
const productModal = document.getElementById("productModal");
const modalClose = document.getElementById("modalClose");
const modalContent = document.getElementById("modalContent");

/* ══════════════════════════════════════════════════════════
   INTRO SCREEN — remove após animação
   ══════════════════════════════════════════════════════════ */
setTimeout(() => {
  document.getElementById("intro-screen").style.display = "none";
  document.body.style.overflow = "auto";
}, 3100);

document.body.style.overflow = "hidden"; // bloqueia scroll durante intro

/* ══════════════════════════════════════════════════════════
   HEADER — scroll behavior
   ══════════════════════════════════════════════════════════ */
window.addEventListener(
  "scroll",
  () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
  },
  { passive: true },
);

/* ══════════════════════════════════════════════════════════
   MENU MOBILE
   ══════════════════════════════════════════════════════════ */
menuToggle.addEventListener("click", () => {
  mainNav.classList.toggle("open");
  // Anima as barras do hamburguer
  const spans = menuToggle.querySelectorAll("span");
  const isOpen = mainNav.classList.contains("open");
  spans[0].style.transform = isOpen ? "rotate(45deg) translate(4px,4px)" : "";
  spans[1].style.opacity = isOpen ? "0" : "1";
  spans[2].style.transform = isOpen ? "rotate(-45deg) translate(4px,-4px)" : "";
});

// Fecha ao clicar em link de nav
mainNav.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.querySelectorAll("span").forEach((s) => {
      s.style.transform = "";
      s.style.opacity = "1";
    });
  });
});

/* ══════════════════════════════════════════════════════════
   SCROLL REVEAL — Intersection Observer
   ══════════════════════════════════════════════════════════ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay para grupos
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

function initReveal() {
  document.querySelectorAll(".reveal, .reveal-right").forEach((el, i) => {
    revealObserver.observe(el);
  });
}

/* ══════════════════════════════════════════════════════════
   RENDER DE PRODUTOS
   ══════════════════════════════════════════════════════════ */
function renderProducts(category = "all") {
  const filtered =
    category === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === category);

  productsGrid.innerHTML = "";

  filtered.forEach((product, i) => {
    const inCart = cart.some((item) => item.id === product.id);
    const animDelay = `${i * 80}ms`;

    const card = document.createElement("div");
    card.className = "product-card";
    card.style.animationDelay = animDelay;
    card.dataset.id = product.id;

    card.innerHTML = `
      <!-- Imagem do produto -->
      <div class="product-img">
        <div class="product-img-inner" style="background:${product.bg}; display:flex; align-items:center; justify-content:center;">
          ${product.svg}
        </div>
        ${product.badge ? `<span class="product-badge ${product.badgeType}">${product.badge}</span>` : ""}
        <button class="product-quick" data-id="${product.id}">Visualizar</button>
      </div>

      <!-- Informações -->
      <div class="product-info">
        <p class="product-category">${product.categoryLabel}</p>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.desc.substring(0, 70)}...</p>
        <div class="product-price-row">
          <div>
            <span class="product-price">R$ ${formatPrice(product.price)}</span>
            ${product.oldPrice ? `<span class="product-price-old">R$ ${formatPrice(product.oldPrice)}</span>` : ""}
          </div>
          <button class="btn-add-cart ${inCart ? "added" : ""}" data-id="${product.id}">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M5 2L3 5v12a2 2 0 002 2h10a2 2 0 002-2V5l-2-3z"/>
              <line x1="3" y1="7" x2="17" y2="7"/>
              <path d="M13 10a3 3 0 01-6 0"/>
            </svg>
            ${inCart ? "No Carrinho" : "Adicionar"}
          </button>
        </div>
      </div>
    `;

    productsGrid.appendChild(card);
  });

  // Delegação de eventos nos cards
  productsGrid.querySelectorAll(".btn-add-cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      addToCart(id);
      btn.classList.add("added");
      btn.innerHTML = `
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M5 2L3 5v12a2 2 0 002 2h10a2 2 0 002-2V5l-2-3z"/>
          <line x1="3" y1="7" x2="17" y2="7"/>
          <path d="M13 10a3 3 0 01-6 0"/>
        </svg>
        No Carrinho`;
    });
  });

  productsGrid
    .querySelectorAll(".product-quick, .product-card")
    .forEach((el) => {
      el.addEventListener("click", (e) => {
        if (e.target.closest(".btn-add-cart")) return; // evita conflito
        const id = parseInt(
          el.dataset.id || el.closest(".product-card").dataset.id,
        );
        openModal(id);
      });
    });

  // Re-observa para animação de scroll
  initReveal();
}

/* ══════════════════════════════════════════════════════════
   FILTRO DE CATEGORIAS
   ══════════════════════════════════════════════════════════ */
document.querySelectorAll(".cat-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".cat-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.category;
    renderProducts(activeCategory);
    // Scroll suave até os produtos
    document
      .getElementById("produtos")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Links de categoria no nav
document.querySelectorAll(".nav-link[data-filter]").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll('.cat-btn[data-category="all"]')[0]?.click();
  });
});

/* ══════════════════════════════════════════════════════════
   CARRINHO — Lógica principal
   ══════════════════════════════════════════════════════════ */

/** Adiciona produto ao carrinho */
function addToCart(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart();
  updateCartUI();
  showToast(`${product.name} adicionado! ✦`);
}

/** Remove produto do carrinho */
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  updateCartUI();
  renderCartItems();
}

/** Atualiza a quantidade de um item */
function updateQty(productId, delta) {
  const item = cart.find((i) => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  saveCart();
  updateCartUI();
  renderCartItems();
}

/** Esvazia o carrinho */
function clearCart() {
  cart = [];
  saveCart();
  updateCartUI();
  renderCartItems();
}

/** Persiste no LocalStorage */
function saveCart() {
  localStorage.setItem("maisonLuxeCart", JSON.stringify(cart));
}

/** Calcula o total */
function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

/** Calcula total de itens */
function getCartItemCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

/** Atualiza badge e totais */
function updateCartUI() {
  const count = getCartItemCount();
  const total = getCartTotal();

  // Badge
  cartCount.textContent = count;
  cartCount.classList.toggle("visible", count > 0);

  // Totais
  const formattedTotal = `R$ ${formatPrice(total)}`;
  cartSubtotal.textContent = formattedTotal;
  cartTotal.textContent = formattedTotal;

  // Estado vazio/preenchido
  const isEmpty = cart.length === 0;
  cartEmpty.classList.toggle("show", isEmpty);
  cartFooter.style.display = isEmpty ? "none" : "flex";
  cartItems.style.display = isEmpty ? "none" : "flex";
}

/** Renderiza a lista de itens no drawer */
function renderCartItems() {
  cartItems.innerHTML = "";

  cart.forEach((item) => {
    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <div class="cart-item-img">
        <div style="background:${item.bg}; width:100%; height:100%; display:flex; align-items:center; justify-content:center; transform:scale(.9);">
          ${item.svg}
        </div>
      </div>
      <div class="cart-item-info">
        <p class="cart-item-category">${item.categoryLabel}</p>
        <p class="cart-item-name">${item.name}</p>
        <div class="cart-item-controls">
          <button class="qty-btn" data-id="${item.id}" data-delta="-1">−</button>
          <span class="qty-display">${item.qty}</span>
          <button class="qty-btn" data-id="${item.id}" data-delta="1">+</button>
          <span class="cart-item-price">R$ ${formatPrice(item.price * item.qty)}</span>
        </div>
      </div>
      <button class="cart-item-remove" data-id="${item.id}">✕</button>
    `;

    // Botões de quantidade
    div.querySelectorAll(".qty-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        updateQty(parseInt(btn.dataset.id), parseInt(btn.dataset.delta));
      });
    });

    // Remover item
    div.querySelector(".cart-item-remove").addEventListener("click", () => {
      removeFromCart(
        parseInt(div.querySelector(".cart-item-remove").dataset.id),
      );
    });

    cartItems.appendChild(div);
  });
}

/* ─── ABRIR / FECHAR CARRINHO ──────────────────────────── */
function openCart() {
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
  renderCartItems();
  updateCartUI();
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

cartBtn.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

clearCartBtn.addEventListener("click", () => {
  if (cart.length === 0) return;
  clearCart();
  showToast("Carrinho esvaziado.");
});

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) return;
  showToast("Redirecionando para o checkout... ✦");
  setTimeout(closeCart, 1200);
});

/* ══════════════════════════════════════════════════════════
   MODAL DE PRODUTO (Quickview)
   ══════════════════════════════════════════════════════════ */
function openModal(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  selectedSize = "";

  modalContent.innerHTML = `
    <div class="modal-img">
      <div style="background:${product.bg}; width:100%; height:100%; display:flex; align-items:center; justify-content:center;">
        ${product.svg}
      </div>
    </div>
    <div class="modal-info">
      <p class="modal-category">${product.categoryLabel}</p>
      <h2 class="modal-name">${product.name}</h2>
      <p class="modal-desc">${product.desc}</p>
      <div class="modal-price">
        R$ ${formatPrice(product.price)}
        ${product.oldPrice ? `<span class="modal-price-old">R$ ${formatPrice(product.oldPrice)}</span>` : ""}
      </div>
      <div class="modal-sizes">
        ${product.sizes
          .map(
            (s) => `
          <button class="size-btn" data-size="${s}">${s}</button>
        `,
          )
          .join("")}
      </div>
      <div class="modal-add">
        <button class="btn-primary" id="modalAddBtn">
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  `;

  // Seleção de tamanho
  modalContent.querySelectorAll(".size-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      modalContent
        .querySelectorAll(".size-btn")
        .forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedSize = btn.dataset.size;
    });
  });

  // Auto-seleciona primeiro tamanho
  const firstSize = modalContent.querySelector(".size-btn");
  if (firstSize) {
    firstSize.click();
  }

  // Adicionar ao carrinho pelo modal
  document.getElementById("modalAddBtn").addEventListener("click", () => {
    addToCart(product.id);
    closeModal();
    setTimeout(openCart, 300);
  });

  modalOverlay.classList.add("open");
  productModal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modalOverlay.classList.remove("open");
  productModal.classList.remove("open");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

/* ══════════════════════════════════════════════════════════
   TOAST DE NOTIFICAÇÃO
   ══════════════════════════════════════════════════════════ */
let toastTimeout;

function showToast(message) {
  toastMsg.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

/* ══════════════════════════════════════════════════════════
   FORMATAÇÃO DE PREÇO
   ══════════════════════════════════════════════════════════ */
function formatPrice(value) {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/* ══════════════════════════════════════════════════════════
   ANIMAÇÃO DOS FEATURE CARDS — stagger
   ══════════════════════════════════════════════════════════ */
document.querySelectorAll(".feature-card").forEach((card, i) => {
  card.dataset.delay = i * 100;
});

/* ══════════════════════════════════════════════════════════
   NEWSLETTER — feedback visual
   ══════════════════════════════════════════════════════════ */
document
  .querySelector(".newsletter-form button")
  ?.addEventListener("click", () => {
    const input = document.querySelector(".newsletter-form input");
    if (input?.value.includes("@")) {
      showToast("Inscrita com sucesso! ✦");
      input.value = "";
    } else {
      showToast("Por favor, insira um e-mail válido.");
    }
  });

/* ══════════════════════════════════════════════════════════
   INICIALIZAÇÃO
   ══════════════════════════════════════════════════════════ */
function init() {
  renderProducts("all");
  updateCartUI();
  initReveal();
}

// Garante que o DOM está pronto
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
