const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxY2E2MzhhYjVjNmNkMTgwODRlNDQ3ZCIsImV4cCI6MTY0NzA2ODE2NywiaWF0IjoxNjQxODg0MTY3fQ.VIsQCW4nLbV-C1SzHK3FhNG3aVFUYUXefcpn-ffEmBA";
const ENDPOINT = "http://146.56.183.55:5050";
const SEARCH_API = ENDPOINT + "/user/searchuser/?keyword=";

const reqData = {
  method: "get",
  headers: {
    "Authorization" : `Bearer ${TOKEN}`,
    "Content-type" : "application/json"
  }
};

async function getUser(searchQuery) {
  const response = fetch(`${SEARCH_API}${searchQuery}`, reqData);
  return response;
}

function removeAllChilden(parentNode) {
  while (parentNode.hasChildNodes()) {
    parentNode.removeChild(parentNode.firstChild);
  } 
}

document.querySelector("form").addEventListener("keyup", (event) => {
  // 기존에 있던 목록 지우기
  const userList = document.querySelector("main .search-user-cont");
  removeAllChilden(userList);

  getUser(event.target.value)
  .then((res) => res.json())
  .then((datas) => {
    if (datas[0]) {
      const frag = document.createDocumentFragment("ul");
      datas.forEach((user) => {
        const li = document.createElement("li");
        li.className = "user-search";
        li.innerHTML = `
          <a href="#none">
            <img src=${user.image} alt="프로필 사진" class="avatar-img">
            <p class="user-info">
              <strong class="market-name">${user.username}</strong>
              <span class="user-name">@ ${user.accountname}</span>
            </p>
          </a>
        `;
        frag.appendChild(li);
      });
      userList.appendChild(frag);
    }
  });
});

// 뒤로 가기 버튼
const prevBtn = document.querySelector(".prev-btn");

prevBtn.addEventListener("click", () => {
  history.back();
});
