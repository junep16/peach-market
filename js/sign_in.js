//로그인 페이지

//로그인 버튼 활성화
//이메일, 패스워드의 인풋태그의 값이 모두 들어와 있으면 버튼활성화
const loginForm = document.querySelector("#login-form");
const loginInputList = loginForm.querySelectorAll("input");
const loginButton = loginForm.querySelector("button");

function enable() {
  let check = 0;
  for (let i = 0; i < loginInputList.length; i++) {
    if (loginInputList[i].value !== "") {
      check += 1;
    }
  }
  if (check === loginInputList.length) {
    loginButton.disabled = false;
    loginButton.classList.add("enable");
  } else {
    loginButton.disabled = true;
  }
}

loginForm.addEventListener("keyup", enable);


//  로그인 함수
async function login() {
  const email = document.querySelector("#email").value;
  const pw = document.querySelector("#password").value;
  const url = "https://api.mandarin.cf";
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
    console.log(res);
    console.log(json);
    // 로그인 성공시
  } else {
    console.log(json.user.token);
    localStorage.setItem("token", json.user.token);
    localStorage.setItem("accountname", json.user.accountname);
    location.href = "/index.html";
  }
}
loginButton.addEventListener("click", login);
