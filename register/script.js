let form = document.getElementById("registerForm");
let name_inp = document.getElementById("username");
let mail_inp = document.getElementById("email");
let password_inp = document.getElementById("password");
let confirm_inp = document.getElementById("confirmPassword");
let mail_error = document.querySelector("#email ~ .error-message");
let name_error = document.querySelector("#username ~ .error-message");
let password_error = document.querySelector(".password-wrapper ~ .error-message");
let confirm_error = document.querySelectorAll(".password-wrapper")[1]?.nextElementSibling;
let toggle_eye=document.querySelectorAll('.toggle-eye')
let validate_text = {
    required: "this is required",
    mail: "invalid email",
    conflict:"confirm password must be match"
  };
let db;
let isValid=true;
function init() {
    db=localStorage.getItem('db');
    if (db) {
       db=JSON.parse(db);
    } else {
       db=[];
    }
}
init();
 function is_Email(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function reset() {
    name_error.style.display = "none";
    name_inp.classList.remove("error");
    mail_error.style.display = "none";
    mail_inp.classList.remove("error");
    password_error.style.display = "none";
    password_inp.classList.remove("error");
    confirm_inp.classList.remove("error");
    confirm_error.style.display = "none";
    isValid=true;
}
function isUserExist(email) {
   const user=db.find(item=>item.email==email);
   if (user) return true;
   return false;
}

function validate() {
  if (isUserExist(mail_inp.value)) {
    alert('email existed,please choose another email!');
    isValid=false;
    return
}
   
    if (!name_inp.value) {
        name_error.innerText = validate_text.required;
        name_error.style.display = "block";
        name_inp.classList.add("error");
        isValid=false;
      }
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
        password_error.innerText = validate_text.required;
        password_error.style.display = "block";
        password_inp.classList.add("error");
        isValid=false;
      }
      if (!confirm_inp.value) {
        confirm_error.innerText = validate_text.required;
        confirm_error.style.display = "block";
        confirm_inp.classList.add("error");
        isValid=false;
      } else if (confirm_inp.value!=password_inp.value) {
        confirm_error.innerText = validate_text.conflict;
        confirm_error.style.display = "block";
        confirm_inp.classList.add("error");
        isValid=false;
      }
}
toggle_eye.forEach(item=>item.addEventListener('click',()=>{
    let input=item.previousElementSibling;
    item.className=input.type=='password' ? 'toggle-eye fa-solid fa-eye' : 'toggle-eye fa-solid fa-eye-slash'
    input.type=input.type=='password' ? 'text' : 'password';
    
    
}))
form.addEventListener("submit", (e) => {
  e.preventDefault();
  reset()
  validate()
  if (!isValid) return
  db.push({
     username: name_inp.value,
     email: mail_inp.value,
     password: password_inp.value,
  })
  localStorage.setItem('db',JSON.stringify(db));
  alert('sign up successfully');
});