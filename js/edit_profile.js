const token = localStorage.getItem("token"); 
const url = "http://146.56.183.55:5050"; 
const uploadProfileImage = document.querySelector("#upload-image");
const selectedImage = uploadProfileImage.files; 
const profileImage = document.querySelector(".profile-image"); 
const userName = document.querySelector(".user-name"); 
const userId = document.querySelector(".input-id"); 
const userIntro = document.querySelector("#user-introduction"); 
const submitButton = document.querySelector(".ms-button");  

const HEADERS = {
  "Authorization": `Bearer ${token}`,
  "Content-type": "application/json",
};

// access check function
async function accessCheck() {
  const URL = `${url}/user/checktoken`;
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


async function getUserProfile() {
  const accountname = localStorage.getItem("accountname"); 
  const res= await fetch (url + `/profile/${accountname}`, {
    method: "GET", 
    headers: {
      "Authorization" : `Bearer ${token}`,
	    "Content-type" : "application/json"
    }
  }) 
  const json = await res.json();  
  const profile = json.profile;   

  profileImage.src = profile.image; 
  userName.value = profile.username;  
  userId.value = profile.accountname; 
  userIntro.value = profile.intro; 
}
getUserProfile(); 

// 이미지 주소 받기 
async function imageUpload(file){
  const formData = new FormData();
  formData.append("image", file); 

  const res = await fetch(`http://146.56.183.55:5050/image/uploadfile`, {
    method: "POST",
    body : formData
  })
  const data = await res.json() 
  const profileImgName = data["filename"]; 
  return profileImgName; 
}


function updateProfile() {
  // 프로필 이미지 프리뷰
  uploadProfileImage.addEventListener("change", async function(event) {
    const file = uploadProfileImage.files;   
    const imageUrls = []; 
    const imgurl = await imageUpload(file[0]); 
    imageUrls.push(url+"/"+imgurl);  
    profileImage.src = imageUrls; 
  }); 

  let nameFlag = true; 
  // 유저 이름 validation (2~10자)
  userName.addEventListener("change", function(event) { 
    nameFlag = false; 
    if (userName.value.length === 0) {
      userName.value = ""; 
      document.querySelector(".input-error.name").classList.add("on"); 
      throw "글자수가 0입니다"; 
    } else if (userName.value.length < 2) {
      document.querySelector(".input-error.name").classList.add("on");
      userName.value = ""; 
      throw "글자수가 2보다 작습니다";  
    } else if (userName.value.length > 10) {
      document.querySelector(".input-error.name").classList.add("on");
      userName.value = ""; 
      throw "글자수가 10보다 큽니다";
    } else {
      document.querySelector(".input-error.name").classList.remove("on");
      nameFlag = true; 
    }
  })
  
  let idFlag = true;  
  // 유저 ID validation (영문, 숫자, 특수문자(.,_)만 사용 가능) 
  const IdRegEx = /[0-9a-zA-Z,._]/gm; 
  userId.addEventListener("change", function(event) {  
    let Id = userId.value;  
    let found = Id.match(IdRegEx); 
    Id = found.join("");  
    idFlag = false; 
  
    if (userId.value !== Id) {
      document.querySelector(".input-error.id").classList.add("on");
      userId.value = ""; 
      throw "아이디가 유효하지 않습니다";
    } else if (userId.value === Id) { 
      document.querySelector(".input-error.id").classList.remove("on"); 
      idFlag = true; 
    }  
  })

  // 프로필 수정내용 전달
  submitButton.addEventListener("click", async (event) => {
    if (!nameFlag || !idFlag) {
      return 
    }
    const res = await fetch(url+"/user", {
      method:"PUT", 
      headers:{
        "Authorization" : `Bearer ${token}`,
        "Content-type" : "application/json"
      },
      body:JSON.stringify({
        "user": {
          "username": userName.value,
          "accountname": userId.value,
          "intro": userIntro.value,
          "image": profileImage.src
          }
      })
    })
    const json = await res.json(); 
    console.log(json);  
    localStorage.setItem("accountname", userId.value); 
    location.href = "/views/profile_detail.html";
  });
} 
updateProfile();
