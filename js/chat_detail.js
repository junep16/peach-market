const $settingMoreBtn = document.querySelector(".more-btn");
const $modal = document.querySelector(".modal");
const $chatroom = document.querySelector("main");
const $chatContainer = $chatroom.querySelector(".chatting-cont");
const $chatTextInput = document.querySelector("#chatTextInput");
const $chatSubmitBtn = document.querySelector(".chat-submit-btn");

$chatroom.scrollTop = $chatroom.scrollHeight;

$settingMoreBtn.addEventListener("click", () => {
  $modal.classList.remove("hidden");
  $modal.addEventListener("click", (event) => {
    const currentNode = event.target;
    if (currentNode.className === "modal") {
      $modal.classList.add("hidden");
    } else if (currentNode.tagName === "BUTTON") {
      location.href = "/views/chat_list.html";
    }
  })
})

$chatTextInput.addEventListener("keyup", () => {
  if ($chatTextInput.value) {
    $chatSubmitBtn.classList.add("on") 
    $chatSubmitBtn.disabled = false;
  }
});

$chatSubmitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const li = document.createElement("li");
  const date = new Date();
  const hour = date.getHours()
  const min = (date.getMinutes() < 10)
    ? "0" + date.getMinutes()
    : date.getMinutes();
  const currentTime = `${hour}:${min}`;

  li.className = "my-user";
  li.innerHTML = `
    <p class="sended-text">${$chatTextInput.value}</p>
    <em class="sended-time">${currentTime}</em>
  `;
  $chatContainer.appendChild(li);
  $chatroom.scrollTop = $chatroom.scrollHeight;
  $chatTextInput.value = "";
});

// 뒤로 가기 버튼
const prevBtn = document.querySelector(".prev-btn");

prevBtn.addEventListener("click", () => {
  history.back();
});


