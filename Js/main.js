// ==========================
// MENU BURGER
// ==========================
const menuBtn = document.querySelector(".menu-btn");
const sideMenu = document.querySelector(".side-menu");

if(menuBtn && sideMenu) {
  menuBtn.addEventListener("click", () => {
    if(sideMenu.style.left === "0px") {
      sideMenu.style.left = "-250px";
    } else {
      sideMenu.style.left = "0px";
    }
  });
}

// ==========================
// FIREBASE
// ==========================
const firebaseConfig = {
  apiKey: "AIzaSyDmxL3LwvoX7QrwD1uU9lFnKGNqu8cmO7w",
  authDomain: "tamboladenoel.firebaseapp.com",
  projectId: "tamboladenoel",
  storageBucket: "tamboladenoel.appspot.com",
  messagingSenderId: "1041101149299",
  appId: "1:1041101149299:web:d81f6ffcba7fd0eb16c606",
  measurementId: "G-KBB6JJQ45D"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database ? firebase.database() : null;

// ==========================
// INSCRIPTION
// ==========================
const registerForm = document.getElementById("registerForm");
if(registerForm){
  registerForm.addEventListener("submit", e=>{
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("emailReg").value;
    const password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential=>{
      const user = userCredential.user;
      if(database){
        database.ref("users/"+user.uid).set({
          username,
          email,
          createdAt: new Date().toISOString()
        });
      }
      alert(`✅ Compte créé pour ${username} !`);
      registerForm.reset();
    }).catch(error=>{
      alert("❌ Erreur : "+error.message);
    });
  });
}

// ==========================
// CONNEXION
// ==========================
const loginForm = document.getElementById("loginForm");
if(loginForm){
  loginForm.addEventListener("submit", e=>{
    e.preventDefault();
    const email = document.getElementById("emailLogin").value;
    const password = document.getElementById("passwordLogin").value;

    auth.signInWithEmailAndPassword(email, password)
    .then(userCredential=>{
      alert(`✅ Connecté : ${userCredential.user.email}`);
      loginForm.reset();
    }).catch(error=>{
