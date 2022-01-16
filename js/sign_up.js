//로그인 버튼 활성화 START
//이메일, 패스워드의 인풋태그의 값이 모두 들어와 있으면 버튼활성화
const signUp = document.querySelector(".sign-up");
const loginInputList = signUp.querySelectorAll("input");
const loginButton = signUp.querySelector("button");

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

//회원가입
const emailPw = document.querySelector(".email-pw");
const profile = document.querySelector(".profile");
async function checkEmailValid(emailInputValue) {
  const url = "http://146.56.183.55:5050";
  const res = await fetch(url + "/user/emailValid", {
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
  // const error = document.createElement("span");
  // const inputPw = document.querySelector("#password");
  // inputPw.appendChild(error);
  // inputPw.textContent = json.message;
  return false;
}

// 이메일 인풋태그에 값이 변경 됐을 때
// 이메일 인풋 태그에 이벤트를 걸어주겠다.
// 값이 변경되는 이벤트가 발생할 때,
// 체크 이메일 밸리드 라는 함수를 실행하겠다.
const emailInput = document.querySelector("#email");
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

// email 정규표현식
const email = document.querySelector("#email");
let emailVal = email.value;

let emailRegExp =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

email.addEventListener("change", () => {
  if (emailVal.match(emailRegExp) !== null) {
    console.log("됐다");
  } else {
    console.log("안됐다");
  }
});

// 프로필설정 계정 ID 정규표현식
const account = document.querySelector("#account");

account.addEventListener("change", () => {
  // let accountRegExp = /^(?=.*[a-zA-Z0-9._]).{5,15}$/;
  let accountRegExp = /^[a-zA-Z0-9._]+$/;
  // let accountRegExp = /^(?=.*[a-zA-Z0-9._]).{5,15}$/;
  // let accountRegExp =  /^(?=.*[a-zA-Z])(?=.*[._])(?=.*[0-9]).{5,15}$/;
  // let accountVal = account.value;
  const accOnly = document.querySelector("#acc_only");
  if (account.value.match(accountRegExp) === null) {
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
const setButton = setProfile.querySelector("button");

function profile1() {
  let checkThis = 0;
  for (let i = 0; i < setInputList.length; i++) {
    if (setInputList[i].value !== "") {
      checkThis += 1;
    }
  }
  if (checkThis === setInputList.length) {
    setButton.disabled = false;
    setButton.classList.add("able");
  } else {
    setButton.disabled = true;
  }
}

setProfile.addEventListener("keyup", profile1);
