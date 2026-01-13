// script.js
// ✅ SOS Plombier 66 — configuration
const PHONE_DISPLAY = "07 56 87 87 03";
const PHONE_TEL = "+33756878703";     // format international
const WHATSAPP_NUMBER = "33756878703"; // sans +
const SMS_NUMBER = "33756878703";      // sans +

// Message par défaut (boutons SMS)
const SMS_DEFAULT_MESSAGE =
`Bonjour,
J’ai besoin d’un plombier à Perpignan (66).

Merci de me rappeler.
`;

// ----- Utils
function setPhoneEverywhere() {
  // liens d'appel
  ["callTop","callHero","callCard","callBottom","callContact","callSticky"].forEach((id)=>{
    const el = document.getElementById(id);
    if (el) el.href = `tel:${PHONE_TEL}`;
  });

  // texte visible
  document.querySelectorAll(".phoneText").forEach((n)=> n.textContent = PHONE_DISPLAY);
}

function setupWhatsapp() {
  const wa = document.getElementById("whatsappBtn");
  if (!wa) return;

  wa.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour, j’ai besoin d’un plombier à Perpignan (66).")}`;
  wa.target = "_blank";
  wa.rel = "noopener";
}

function makeSmsLink(message) {
  // iOS / Android : ouvre l’app SMS
  return `sms:${SMS_NUMBER}?&body=${encodeURIComponent(message)}`;
}

function setupSmsButtons() {
  // SMS direct (boutons)
  const ids = ["smsHeroBtn","smsCardBtn","smsContactBtn","smsDrawerBtn","smsDirectBtn"];
  ids.forEach((id)=>{
    const el = document.getElementById(id);
    if (!el) return;
    el.setAttribute("href", makeSmsLink(SMS_DEFAULT_MESSAGE));
  });
}

function setupDrawer() {
  const burger = document.querySelector(".burger");
  const drawer = document.getElementById("drawer");
  const closeBtn = document.querySelector(".drawerClose");
  const backdrop = document.querySelector(".drawerBackdrop");

  const open = () => {
    drawer.classList.add("isOpen");
    drawer.setAttribute("aria-hidden", "false");
    burger.setAttribute("aria-expanded", "true");
  };
  const close = () => {
    drawer.classList.remove("isOpen");
    drawer.setAttribute("aria-hidden", "true");
    burger.setAttribute("aria-expanded", "false");
  };

  burger?.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  backdrop?.addEventListener("click", close);
  drawer?.querySelectorAll("a[href^='#']").forEach((a) => a.addEventListener("click", close));

  // ESC pour fermer
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("isOpen")) close();
  });
}

// ✅ Formulaire → ouvre un SMS pré-rempli (pas d’email)
window.handleQuote = function (ev) {
  ev.preventDefault();
  const fd = new FormData(ev.target);

  const message =
`Demande SOS Plombier 66
Nom : ${fd.get("name")}
Téléphone : ${fd.get("phone")}

Message :
${fd.get("msg")}

Zone : Perpignan / 66`;

  window.location.href = makeSmsLink(message);
  return false;
};

// Init
document.getElementById("year").textContent = new Date().getFullYear();
setPhoneEverywhere();
setupWhatsapp();
setupSmsButtons();
setupDrawer();
