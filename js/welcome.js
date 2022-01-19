// splash화면 1초 뒤에 사라지고 main 화면으로
const splash = document.querySelector(".splash");

function disappear() {
  splash.classList.add("disappear");
}
setTimeout(disappear, 1000);
// transition이 안먹힘. 어디다가 줘야될까요?
