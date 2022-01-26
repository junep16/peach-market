// 설정 더보기 버튼
const settingMoreBtn = document.querySelector(".more-btn");
const modal = document.querySelector(".modal");

settingMoreBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  modal.addEventListener("click", (event) => {
    const currentNode = event.target;
    if (currentNode.className === "modal") {
      modal.classList.add("hidden");
    } else if (currentNode.tagName === "BUTTON") {
      location.href = "/views/chat_list.html";
    }
  })
})

// 뒤로 가기 버튼
const prevBtn = document.querySelector(".prev-btn");

prevBtn.addEventListener("click", () => {
  history.back();
});


