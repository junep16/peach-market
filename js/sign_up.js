//로그인 버튼 활성화 START
//이메일, 패스워드의 인풋태그의 값이 모두 들어와 있으면 버튼활성화
const signUp = document.querySelector(".sign-up");
const loginInputList = signUp.querySelectorAll("input");
const loginButton = signUp.querySelector("button");
const joined = document.querySelector("#joined");
const emailInput = document.querySelector("#email");

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
signUp.addEventListener("keyup", able);

//이메일로 회원가입
const emailPw = document.querySelector(".email-pw");
const profile = document.querySelector(".profile");
async function checkEmailValid(emailInputValue) {
  const url = "http://146.56.183.55:5050";
  const res = await fetch(url + "/user/emailvalid", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        email: emailInputValue,
      },
    }),
  });
  console.log(res);
  const json = await res.json();
  console.log(json);
  console.log(json.message);
  if (json.message !== "사용 가능한 이메일 입니다.") {
    joined.textContent = json.message;
    joined.classList.remove("hidden");
    emailInput.value = "";
    loginButton.disabled = true;
  }
}

// 이메일 인풋태그에 값이 변경 됐을 때
// 이메일 인풋 태그에 이벤트를 걸어주겠다.
// 값이 변경되는 이벤트가 발생할 때,
// 체크 이메일 밸리드 라는 함수를 실행하겠다.
emailInput.addEventListener("change", () => {
  checkEmailValid(emailInput.value);
});

// 다음 버튼 클릭시 .profile hidden속성 제거,
// .email-pw에 hidden속성 추가(화면 전환)
const nextBtn = document.querySelector(".next-btn");
nextBtn.addEventListener("click", () => {
  profile.classList.remove("hidden");
  emailPw.classList.add("hidden");

  // const email = document.querySelector("#email").value;
  // const pw = document.querySelector("#password").value;
  // if (pw.length > 5) {
  //   const emailValid = await checkEmailValid(email);
  //   if (emailValid) {
  //     emailPw.style.display = "none";
  //     profile.style.display = "block";
  //   }
  // } else {
  //   alert("비밀번호를 다시 입력하세요.");
  // }
});

// email 정규표현식 유효성검사
const email = document.querySelector("#email");
let emailRegExp =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

email.addEventListener("change", () => {
  let emailVal = email.value;
  if (emailVal.match(emailRegExp) == null) {
    joined.textContent = "이메일 형식이 맞지 않습니다.";
    email.value = "";
    joined.classList.remove("hidden");
    console.log("사용 불가능");
  } else {
    console.log("사용 가능");
    joined.classList.add("hidden");
  }
});
//사용 가능 불가능 다시체크하기. 정규표현식이 틀린듯

//비밀번호 6자리 이상. 유효성검사
const passwordInput = signUp.querySelector("#password");
passwordInput.addEventListener("change", () => {
  console.log(passwordInput.value);
  if (passwordInput.value.length < 6) {
    passwordInput.value = "";
    const passwordError = document.querySelector("#passwordError");
    passwordError.classList.remove("hidden");
  }
});

// 프로필설정 계정 ID 정규표현식
const account = document.querySelector("#account");

account.addEventListener("keydown", () => {
  let accountRegExp = /^[a-zA-Z0-9._]+$/;
  // let accountRegExp = /^(?=.*[a-zA-Z0-9._]).{1,15}$/;
  // let accountRegExp =  /^(?=.*[a-zA-Z])(?=.*[._])(?=.*[0-9])$/;
  // let accountVal = account.value;
  const accOnly = document.querySelector("#acc_only");
  if (account.value.match(accountRegExp) == null) {
    accOnly.classList.remove("hidden");
    // } else if (중복체크){
    //이미 사용중인 아이디...
  } else {
    accOnly.classList.add("hidden");
  }
});

//프로필계정 3개의 input요소 채워지면 버튼 활성화 (querySelectorAll)
const setProfile = document.querySelector(".set-profile");
const setInputList = setProfile.querySelectorAll("input");
const startBtn = setProfile.querySelector("button");

function profile1() {
  let checkThis = 0;
  for (let i = 0; i < setInputList.length; i++) {
    if (setInputList[i].value !== "") {
      checkThis += 1;
    }
  }
  if (checkThis === setInputList.length) {
    startBtn.disabled = false;
    startBtn.classList.add("able");
  } else {
    startBtn.disabled = true;
  }
}

setProfile.addEventListener("keyup", profile1);

// 감귤마켓 시작하기 버튼 클릭시 .profile hidden속성 제거,
// .email-pw에 hidden속성 추가(화면 전환)
// const nextBtn = document.querySelector(".next-btn");
// nextBtn.addEventListener("click", () => {
//   profile.classList.remove("hidden");
//   emailPw.classList.add("hidden");

startBtn.addEventListener("click", () => {
  location.href = "/index.html";
});
