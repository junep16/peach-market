const TOKEN = localStorage.getItem("token"); 
const ENDPOINT = "https://api.mandarin.cf";
const SEARCH_API = ENDPOINT + "/user/searchuser/?keyword=";

const HEADERS = {
  "Authorization": `Bearer ${TOKEN}`,
  "Content-type": "application/json",
};

// access check function
async function accessCheck() {
  const URL = `${ENDPOINT}/user/checktoken`;
  const reqOption = {
    method: "GET",
    headers: HEADERS
  };
  const res = await fetch(URL, reqOption);
  const json = await res.json();
  // 접근 금지!
  if (!json.isValid) { location.href = "/views/sign_in.html" }
}
accessCheck();


const reqOption = {
  method: "get",
  headers: HEADERS
};

// 기존에 있던 목록 지우기
function removeAllChilden(parentNode) {
  while (parentNode.hasChildNodes()) {
    parentNode.removeChild(parentNode.firstChild);
  } 
}

// 검색 결과 유저 정보 화면에 보여주기
async function paintUserList(event) {
  const userList = document.querySelector("main .search-user-cont");
  removeAllChilden(userList);

  const searchValue = event.target.value;
  const res = await fetch(`${SEARCH_API}${searchValue}`, reqOption);
  const json = await res.json();

  if (json[0]) {
    const frag = document.createDocumentFragment("ul");
      json.forEach((user) => {
        const { accountname, image, username, _id } = user;

        // 검색 키워드 하이라이트
        const userName = username.replace(searchValue, `<span>${searchValue}</span>`);
  
        const li = document.createElement("li");
        li.className = "user-search";
        li.innerHTML = `
          <a href="/views/profile_detail.html?id=${accountname}">
            <img src=${image} alt="프로필 사진" class="avatar-img">
            <p class="user-info">
              <strong class="market-name">${userName}</strong>
              <span class="user-name">@ ${accountname}</span>
            </p>
          </a>
        `;
        frag.appendChild(li);
      });
    userList.appendChild(frag);
  }
};

document.querySelector("form").addEventListener("keyup", paintUserList);

// 뒤로 가기 버튼
const prevBtn = document.querySelector(".prev-btn");

prevBtn.addEventListener("click", () => {
  history.back();
});
