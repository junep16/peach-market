const emailPw = document.querySelector(".email-pw");
const profile = document.querySelector(".profile");

document.querySelector(".next-btn").addEventListener("click", () =>{
  emailPw.style.display = "none";
  console.log('뭥미')
  profile.style.display = "block";
})