// splash화면 1초 뒤에 사라지고 main 화면으로
const splash = document.querySelector(".splash");

function disappear() {
  splash.classList.add("disappear");
}
setTimeout(disappear, 1000);
// transition이 안먹힘. 어디다가 줘야될까요?

//로그인 유효성

const loginForm = document.querySelector("#login-form");
console.log(loginForm)
const loginInput = loginForm.querySelector("input");
const loginButton = loginForm.querySelector("button");
console.log(loginInput)
// 쿼리셀렉터 올로 **for문이나 forEach, map, **filter 이 세개가 
// 내부적으로 for문을 사용한다.
loginButton.addEventListener('DOMContentLoaded', () => {
  if (loginInput.value !== '') {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
});



// const loginEmail = loginForm.querySelector("#email");
// const loginPassword = loginForm.querySelector("#password");
// const loginButton = loginForm.querySelector("button");
// const loginHidden = loginForm.querySelector(".hidden");

// function babo() {
//   console.log('바보냐');
// };

// loginForm.addEventListener('submit', () => {
//   localStorage.setItem("email", loginEmail.value);
//   localStorage.setItem("password", loginPassword.value);
// });

// function onLoginSubmit(event) {
//   event.preventDefault();

//   const userEmail = loginEmail.value;
//   const userPassword = loginPassword.value;
//   loginEmail.value = "";
//   const newLocalObj = {
//     email: userEmail,
//     password: userPassword,
//   }

//   if (localStorage.getItem(username) !== password) {
//     loginHidden.classList.remove("hidden");
//   } else {
//     alert("로그인 성공!");
//     loginHidden.classList.add("hidden");
//   }

//   const more6 = loginForm.querySelector(".more6");

//   if (localStorage.getItem("key") !== "moonding@gmail.com") {
//     console.log("불일치");
//     loginHidden.classList.remove("hidden");
//   } else if (more6.value.length < 6) {
//     loginHidden.classList.remove("hidden");
//   } else {
//     alert("로그인 성공!");
//     loginHidden.classList.add("hidden");
//   }
// }

// loginForm.addEventListener("submit", onLoginSubmit);
