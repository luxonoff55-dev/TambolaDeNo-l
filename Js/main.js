// ==== CONFIGURATION FIREBASE (mode compatibilité pour navigateur) ====

// Configuration Firebase de ton projet
const firebaseConfig = {
  apiKey: "AIzaSyDmxL3LwvoX7QrwD1uU9lFnKGNqu8cmO7w",
  authDomain: "tamboladenoel.firebaseapp.com",
  projectId: "tamboladenoel",
  storageBucket: "tamboladenoel.firebasestorage.app",
  messagingSenderId: "1041101149299",
  appId: "1:1041101149299:web:d81f6ffcba7fd0eb16c606",
  measurementId: "G-KBB6JJQ45D"
};

// Initialisation de Firebase
firebase.initializeApp(firebaseConfig);

// Récupération des services
const auth = firebase.auth();
const database = firebase.database ? firebase.database() : null;

// ==========================
// GESTION INSCRIPTION UTILISATEUR
// ==========================
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("emailReg").value;
    const password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Enregistrer les infos dans la base
        if (database) {
          database.ref("users/" + user.uid).set({
            username: username,
            email: email,
            createdAt: new Date().toISOString()
          });
        }
        alert(`✅ Compte créé pour ${username} !`);
        registerForm.reset();
      })
      .catch((error) => {
        alert("❌ Erreur : " + error.message);
      });
  });
}

// ==========================
// GESTION CONNEXION UTILISATEUR
// ==========================
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("emailLogin").value;
    const password = document.getElementById("passwordLogin").value;

    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert(`✅ Connecté : ${user.email}`);
        loginForm.reset();
      })
      .catch((error) => {
        alert("❌ Erreur : " + error.message);
      });
  });
}

// ==========================
// BOUTONS POUR CHANGER ENTRE FORMULAIRES
// ==========================
const showLogin = document.getElementById("showLogin");
const showRegister = document.getElementById("showRegister");

if (showLogin) {
  showLogin.addEventListener("click", () => {
    document.querySelector(".registration-form-section").style.display = "none";
    document.querySelector(".login-form-section").style.display = "block";
  });
}

if (showRegister) {
  showRegister.addEventListener("click", () => {
    document.querySelector(".login-form-section").style.display = "none";
    document.querySelector(".registration-form-section").style.display = "block";
  });
}

// ==========================
// GENERATION DE TICKETS
// ==========================
function generateTicket() {
  const prefix = "TMB";
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}${randomNum}`;
}

// ==========================
// SIMULATION D’ACHAT DE TICKETS
// ==========================
function buyTickets(quantity, price) {
  const user = auth.currentUser;
  if (!user) {
    alert("⚠️ Vous devez être connecté pour acheter un ticket !");
    return;
  }

  const tickets = [];
  for (let i = 0; i < quantity; i++) {
    tickets.push(generateTicket());
  }

  if (database) {
    tickets.forEach((t) => {
      database.ref("tickets/" + user.uid + "/" + t).set({
        ticketNumber: t,
        price: price / quantity,
        createdAt: new Date().toISOString()
      });
    });
  }

  alert(`✅ Achat confirmé !\nTickets : ${tickets.join(", ")}\nMontant : ${price}€`);
}
