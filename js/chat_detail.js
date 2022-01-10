// 설정 더보기 버튼
const settingMoreBtn = document.querySelector(".more-btn");
const modal = document.querySelector(".modal");

settingMoreBtn.addEventListener("click", () => {
  modal.classList.toggle("hidden");
})


// 설정 더보기 버튼 닫기
const closeModalBtn = document.querySelector(".close-modal-btn");

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
})

// 채팅방 나가기 버튼
const chatOutBtn = document.querySelector(".chat-out-btn");

chatOutBtn.addEventListener("click", () => {
  location.href = "/views/chat_list.html"
});

// 뒤로 가기 버튼
const prevBtn = document.querySelector(".prev-btn");

prevBtn.addEventListener("click", () => {
  history.back();
});


