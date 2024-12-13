
let form = document.getElementById("loginForm");
let mail_inp = document.getElementById("email");
let password_inp = document.getElementById("password");
let mail_error = document.querySelector("#email ~ .error-message");
let password_error = document.querySelector(
  ".password-wrapper ~ .error-message"
);
let toggle_eye = document.querySelector(".toggle-eye");
let db;
let isValid = true;
let validate_text = {
    required: "this is required",
    mail: "invalid email",
    conflict:"wrong password"
  };
toggle_eye.addEventListener("click", (e) => {
  let item = toggle_eye;
  let input = item.previousElementSibling;
  item.className =
    input.type == "password"
      ? "toggle-eye fa-solid fa-eye"
      : "toggle-eye fa-solid fa-eye-slash";
  input.type = input.type == "password" ? "text" : "password";
});
function init() {
  db = localStorage.getItem("db");
  if (db) {
    db = JSON.parse(db);
  } else {
    db = [];
  }
}
init();
function is_Email(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function validate() {
    if (!mail_inp.value) {
        mail_error.innerText = validate_text.required;
        mail_error.style.display = "block";
        mail_inp.classList.add("error");
        isValid=false;
      } else if (!is_Email(mail_inp.value)) {
        mail_error.innerText = validate_text.mail;
        mail_error.style.display = "block";
        mail_inp.classList.add("error");
        isValid=false;
      } 
  if (!password_inp.value) {
    password_error.innerText =  "this is required";
    password_error.style.display = "block";
    password_inp.classList.add("error");
    isValid = false;
  }
}
function reset() {
  mail_error.style.display = "none";
  mail_inp.classList.remove("error");
  password_error.style.display = "none";
  password_inp.classList.remove("error");
  isValid = true;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  reset();
  validate();
  if (!isValid) return;
  let user=db.find(item=>item.email==mail_inp.value);
  if (!user) {
      alert('email not found');
      return
  }
  if (user.password!==password_inp.value) {
    password_error.innerText =  validate_text.conflict;
    password_error.style.display = "block";
    password_inp.classList.add("error");
    return
  }
  alert('login successfully')
});
