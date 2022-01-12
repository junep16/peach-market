//로그인

//로그인 버튼 활성화 START
//이메일, 패스워드의 인풋태그의 값이 모두 들어와 있으면 버튼활성화 

//querySelectorAll로 했을때 
const loginForm = document.querySelector("#login-form");
const loginInputList = loginForm.querySelectorAll("input");
const loginButton = loginForm.querySelector("button");

function able() {
  let check = 0;
  for (let i = 0; i < loginInputList.length; i++) {
    if (loginInputList[i].value !== '') {
      check += 1;
    }  
  }
  if (check === loginInputList.length) {
    loginButton.disabled = false;
    loginButton.classList.add('able');
  } else {
    loginButton.disabled = true;
  }
}

loginForm.addEventListener('keyup', able);

//로그인 버튼 활성화 END

// 로그인 API START
function getInput() {
  console.log(document.querySelector("#email").value);
  console.log(document.querySelector("#password").value);
}

async function login() {
  const email = document.querySelector("#email").value;
  const pw = document.querySelector("#password").value;
  const url = "http://146.56.183.55:5050";
  const loginData = {
    "user":{
        "email": email,
        "password": pw,
    }
}
  const res = await fetch(url+'/user/login',{
    method: "POST",
    headers: {
      "Content-type" : "application/json"
    },
    body: JSON.stringify(loginData),
  })
  const json = await res.json();
  console.log(json.message);
  console.log(json.status);
  console.log(res);
  if (json.status === 422) {
    const errMsg = document.querySelector(".error"); 
    // errMsg.textContent = json.message;
    errMsg.classList.remove("hidden");
  }
}

loginButton.addEventListener("click", login);

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