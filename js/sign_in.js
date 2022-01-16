//로그인

//로그인 버튼 활성화 START
//이메일, 패스워드의 인풋태그의 값이 모두 들어와 있으면 버튼활성화

//이건 querySelectorAll로 했을때
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

// 로그인 API START
function getInput() {
  console.log(document.querySelector("#email").value);
  console.log(document.querySelector("#password").value);
}

//  로그인 함수
async function login() {
  const email = document.querySelector("#email").value;
  const pw = document.querySelector("#password").value;
  const url = "http://146.56.183.55:5050";
  const loginData = {
    user: {
      email: email,
      password: pw,
    },
  };
  const res = await fetch(url + "/user/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(loginData),
  });
  const json = await res.json();
  // 로그인 실패시
  if (json.status === 422) {
    const errMsg = document.querySelector(".error");
    errMsg.textContent = json.message;
    errMsg.classList.remove("hidden");
  // 로그인 성공시
  } else {
    localStorage.setItem("token", json.user.token);
    location.href="/index.html"
  }
}
loginButton.addEventListener("click", login);
