// ==== CONFIGURATION FIREBASE ====
const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "VOTRE_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://VOTRE_PROJECT_ID.firebaseio.com",
  projectId: "VOTRE_PROJECT_ID",
  storageBucket: "VOTRE_PROJECT_ID.appspot.com",
  messagingSenderId: "VOTRE_SENDER_ID",
  appId: "VOTRE_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// ==== INSCRIPTION UTILISATEUR ====
const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("emailReg").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      database.ref("users/" + user.uid).set({
        username: username,
        email: email
      });
      alert(`✅ Compte créé pour ${username} !`);
      registerForm.reset();
    })
    .catch((error) => {
      alert("❌ " + error.message);
    });
});

// ==== CONNEXION UTILISATEUR ====
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("emailLogin").value;
  const password = document.getElementById("passwordLogin").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert(`✅ Connecté : ${email}`);
      loginForm.reset();
    })
    .catch((error) => {
      alert("❌ " + error.message);
    });
});

// ==== BASCULE INSCRIPTION / CONNEXION ====
document.getElementById("showLogin").addEventListener("click", () => {
  document.querySelector(".registration-form-section").style.display = "none";
  document.querySelector(".login-form-section").style.display = "block";
});
document.getElementById("showRegister").addEventListener("click", () => {
  document.querySelector(".login-form-section").style.display = "none";
  document.querySelector(".registration-form-section").style.display = "block";
});

// ==== GENERATION DE TICKETS ====
function generateTicket() {
  const prefix = "TMB";
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}${randomNum}`;
}

// ==== ACHAT DE TICKETS PAYANTS ====
function buyTickets(quantity, price) {
  const tickets = [];
  for(let i = 0; i < quantity; i++){
    tickets.push(generateTicket());
  }
  alert(`✅ Achat réussi !\nTickets : ${tickets.join(", ")}\nMontant : ${price}€`);
  // Ici, tu peux intégrer Stripe / PayPal Checkout
}
