const url = "http://146.56.183.55:5050";

const signUp = document.querySelector(".sign-up");
const emailPw = document.querySelector("#email-pw");
const emailPwInputs = emailPw.querySelectorAll("input");
const emailPwBtn = emailPw.querySelector("button");
const emailError = document.querySelector("#email-error");
const passwordInput = signUp.querySelector("#password");
const emailInput = document.querySelector("#email");
const imageInput = document.querySelector("#image-input");
const nameInput = document.querySelector("#name");
const accountInput = document.querySelector("#account");
const introInput = document.querySelector("#intro");

const previewImg = document.querySelector(".img-label img");
const profile = document.querySelector("#profile");


//이메일, 패스워드의 인풋 값이 모두 들어와 있으면 다음 버튼활성화
function able() {
  let check = 0;
  for (let i = 0; i < emailPwInputs.length; i++) {
    if (emailPwInputs[i].value !== "") {
      check += 1;
    }
  }
  if (check === emailPwInputs.length) {
    emailPwBtn.disabled = false;
    emailPwBtn.classList.add("enable");
  } else {
    emailPwBtn.disabled = true;
  }
}
emailPw.addEventListener("keyup", able);

//이메일로 회원가입
async function checkEmailValid(emailInputValue) {
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

  const json = await res.json();
  if (json.message !== "사용 가능한 이메일 입니다.") {
    emailError.textContent = json.message;
    emailError.classList.remove("hidden");
    emailInput.value = "";
    emailPwBtn.disabled = true;
  }
}

// 이메일 인풋태그에 값이 변경 됐을 때
// 이메일 인풋 태그에 이벤트를 걸어주겠다.
// 값이 변경되는 이벤트가 발생할 때,
// 체크 이메일 밸리드 라는 함수를 실행하겠다.
emailInput.addEventListener("change", () => {
  checkEmailValid(emailInput.value);
});

// email 정규표현식 유효성검사
let emailRegExp =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z].{2,3}$/i;
// /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
emailInput.addEventListener("change", () => {
  let emailVal = emailInput.value;
  if (emailVal.match(emailRegExp) == null) {
    emailError.textContent = "이메일 형식이 맞지 않습니다.";
    emailInput.value = "";
    emailError.classList.remove("hidden");
  } else {
    emailError.classList.add("hidden");
  }
});

//비밀번호 6자리 이상. 유효성검사
passwordInput.addEventListener("change", () => {
  if (passwordInput.value.length >= 6) {
    passwordError.classList.add("hidden");
  } else {
    passwordInput.value = "";
    const passwordError = document.querySelector("#passwordError");
    passwordError.classList.remove("hidden");
  }
});

// 다음 버튼 클릭시 회원가입 페이지 사라지고 프로필 설정 화면 나타나기
const nextBtn = document.querySelector(".next-btn");
nextBtn.addEventListener("click", () => {
  emailPw.classList.add("hidden");
  profile.classList.remove("hidden");
});

// 프로필 사진 등록하기
imageInput.addEventListener("change", async () => {
  const dataForm = new FormData();
  dataForm.append("image", imageInput.files[0]);
  const res = await fetch(url + "/image/uploadfile", {
    method: "POST",
    body: dataForm,
  });
  const json = await res.json();
  previewImg.src = `http://146.56.183.55:5050/${json.filename}`;
});

// 프로필설정 계정 ID 정규표현식

accountInput.addEventListener("change", () => {
  let accountRegExp = /^[a-zA-Z0-9._]+$/;
  // let accountRegExp = /^(?=.*[a-zA-Z0-9._]).{1,15}$/;
  // let accountRegExp =  /^(?=.*[a-zA-Z])(?=.*[._])(?=.*[0-9])$/;
  // let accountVal = account.value;
  const accOnly = document.querySelector("#acc_only");
  if (accountInput.value.match(accountRegExp) == null) {
    accOnly.classList.remove("hidden");
  } else {
    accOnly.classList.add("hidden");
  }
});

//프로필계정 4개의 input요소 채워지면 버튼 활성화 (querySelectorAll)

const setInputList = profile.querySelectorAll("input");
const startBtn = profile.querySelector("button");

function profileBtnEnable() {
  let checkThis = 0;
  for (let i = 0; i < setInputList.length; i++) {
    if (setInputList[i].value !== "") {
      checkThis += 1;
    }
  }
  if (checkThis === setInputList.length) {
    startBtn.disabled = false;
    startBtn.classList.add("enable");
  } else {
    startBtn.disabled = true;
  }
}

profile.addEventListener("keyup", profileBtnEnable);

// 회원가입 API 연동
const submitForm = document.querySelector("form");
submitForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const res = await fetch(url + "/user", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      user: {
        email: emailInput.value,
        password: passwordInput.value,
        username: nameInput.value,
        accountname: accountInput.value,
        intro: introInput.value,
        image: previewImg.src,
      },
    }),
  });
  const json = await res.json();
  const accOnly = document.querySelector("#acc_only");
  //로그인 성공시
  if (json.status === 422) {
    accOnly.textContent = json.message;
    accOnly.classList.remove("hidden");
  //로그인 실패시
  } else { 
    location.href="/sign_in.html";
  }
});
