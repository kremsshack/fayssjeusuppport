// ===========================
// CONFIGURATION
// ===========================
const GAME_NAME = "NEON RIFT";

// ===========================
// MENU BURGER (MOBILE)
// ===========================
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

navToggle.addEventListener("click", function () {
  navMenu.classList.toggle("active");
});

// Ferme le menu quand on clique sur un lien
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navMenu.classList.remove("active");
  });
});

// ===========================
// SCROLL SPY (NAVIGATION)
// ===========================
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll(".section");
  const scrollPos = window.scrollY + 100;

  sections.forEach(function (section) {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach(function (link) {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + sectionId) {
          link.classList.add("active");
        }
      });
    }
  });
});

// ===========================
// FAQ ACCORDION
// ===========================
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(function (item) {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", function () {
    // Ferme tous les autres items
    faqItems.forEach(function (otherItem) {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
      }
    });

    // Toggle l'item actuel
    item.classList.toggle("active");
  });
});
// ===========================
// GESTION DU FORMULAIRE CONTACT
// ===========================
const contactForm = document.getElementById("contact-form");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const toast = document.getElementById("toast");

// Fonction pour afficher les notifications (Toast)
function showToast(message, type = "success") {
  toast.textContent = message;
  toast.className = "toast show"; // Reset classes

  if (type === "error") {
    toast.style.borderColor = "#ff4f4f"; // Rouge pour erreur
    toast.style.color = "#fff";
  } else {
    toast.style.borderColor = "#00f0ff"; // Bleu néon pour succès
  }

  // Cache le toast après 3 secondes
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Écouteur sur l'envoi du formulaire
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailValue = emailInput.value.trim();
    const messageValue = messageInput.value.trim();
    const emailRegex = /^[\w.-]+@[\w.-]+\.fr$/;

    // 4. VÉRIFICATIONS

    if (emailValue === "" || messageValue === "") {
      showToast("Veuillez remplir tous les champs !", "error");
      return;
    }

    if (!emailRegex.test(emailValue)) {
      showToast("Erreur : L'email doit se terminer par .fr", "error");
      emailInput.style.borderColor = "#ff4f4f";
      return;
    } else {
      emailInput.style.borderColor = "rgba(255, 255, 255, 0.12)";
    }

    // 5. SI TOUT EST BON
    // (C'est ici qu'on mettra le PHP plus tard)
    console.log("Formulaire valide ! Prêt pour PHP.");

    showToast("Ticket envoyé ! Un expert va vous répondre.");
    contactForm.reset();
  });
}
