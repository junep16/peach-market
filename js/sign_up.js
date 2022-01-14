//로그인 버튼 활성화 START
//이메일, 패스워드의 인풋태그의 값이 모두 들어와 있으면 버튼활성화

//querySelectorAll로 했을때
const loginForm = document.querySelector("#login-form");
const loginInputList = loginForm.querySelectorAll("input");
const loginButton = loginForm.querySelector("button");

function able() {
  let check = 0;
  for (let i = 0; i < loginInputList.length; i++) {
    if (loginInputList[i].value !== "") {
      check += 1;
    }
  }
  if (check === loginInputList.length) {
    loginButton.disabled = false;
    loginButton.classList.add("able");
  } else {
    loginButton.disabled = true;
  }
}

loginForm.addEventListener("keyup", able);

//로그인 버튼 활성화 END

// sign_in API START
// function getInput() {
//   console.log(document.querySelector("#email").value);
//   console.log(document.querySelector("#password").value);
// }

// async function login() {
//   const email = document.querySelector("#email").value;
//   const pw = document.querySelector("#password").value;
//   const url = "http://146.56.183.55:5050";
//   const loginData = {
//     "user": {
//       "email": email,
//       "password": pw,
//     }
//   }
//   const res = await fetch(url + '/user/login', {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json"
//     },
//     body: JSON.stringify(loginData),
//   })
//   const json = await res.json();
//   console.log(json.message);
//   console.log(json.status);
//   console.log(res);
//   if (json.status === 422) {
//     const errMsg = document.querySelector(".error");
//     // errMsg.textContent = json.message;
//     errMsg.classList.remove("hidden");
//   }
// }

// loginButton.addEventListener("click", login);

//password input에서 enter 할 때 button클릭

// const pw = document.querySelector(".password");
// pw.addEventListener('keydown', () => {
//   console.log('머냐고');
// })

//회원가입
const emailPw = document.querySelector(".email-pw");
const profile = document.querySelector(".profile");
async function checkEmailValid(email) {
  const url = "http://146.56.183.55:5050";
  const res = await fetch(url + "/user/emailValid", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        email: email,
      },
    }),
  });
  console.log(res);
  const json = await res.json();
  console.log(json);
  return false;
}

const nextBtn = document.querySelector(".next-btn");
nextBtn.addEventListener("click", async () => {
  const email = document.querySelector("#email").value;
  const pw = document.querySelector("#password").value;
  if (pw.length > 5) {
    const emailValid = await checkEmailValid(email);
    if (emailValid) {
      emailPw.style.display = "none";
      profile.style.display = "block";
    }
  } else {
    alert("비밀번호를 다시 입력하세요.");
  }
});

// email 정규표현식
// const email = document.querySelector("#email");
// let emailVal = email.value;

// let emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

// email.addEventListener("change", () =>{
//   if (emailVal.match(emailRegExp) !== null) {
//     console.log('됐다');
//   } else {
//     console.log('안됐다');
//   }
// })

// 프로필설정 정규표현식
const account = document.querySelector("#account");

account.addEventListener("change", () => {
  let accountRegExp = /^(?=.*[a-zA-Z0-9._]).{5,15}$/;
  // let accountRegExp =  /^(?=.*[a-zA-Z])(?=.*[._])(?=.*[0-9]).{5,15}$/;
  // let accountVal = account.value;
  if (account.value.match(accountRegExp) != null) {
    console.log("일치");
  } else {
    console.log("불일치");
  }
});

// function login() {
//   console.log(document.querySelector("#email").value);
//   console.log(document.querySelector("#password").value);
// }

// loginButton.addEventListener("click", login);

// loginInput.forEach(el => {
//   let count = 0;
//   if (el.value !== '') {
//     count += 1;
//   }
// });

// function login () {
//   console.log(loginInput.value);
// }

// loginButton.addEventListener("click", login);

// function able () {
//   const check = 0;
//   for (let i = 0; i < loginInput.length; i++) {
//     if (loginInput[i].value !== '') {
//       loginButton.disabled = false;
//       loginButton.classList.add('able');
//       console.log('able');
//     } else {
//       loginButton.disabled = true;
//       console.log('disable');
//     }
//   }
// }

// loginButton.addEventListener('input', );

//

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
