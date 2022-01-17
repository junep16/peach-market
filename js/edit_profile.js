const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxY2E2MzhhYjVjNmNkMTgwODRlNDQ3ZCIsImV4cCI6MTY0NzE0MzQ1MCwiaWF0IjoxNjQxOTU5NDUwfQ.MPLwiebPtzC4JjWF3UqCT01v-IeUhNtT8JQ05Kp3gXA"; 
const url = "http://146.56.183.55:5050"; 
const uploadProfileImage = document.querySelector("#upload-image");
const selectedImage = uploadProfileImage.files; 
const profileImage = document.querySelector(".profile-image"); 
const userName = document.querySelector(".user-name"); 
const userId = document.querySelector(".input-id"); 
const userIntro = document.querySelector("#user-introduction"); 

async function getUserProfile() {
  const res= await fetch (url + "/profile/hey_binky", {
    method: "GET", 
    headers: {
      "Authorization" : `Bearer ${token}`,
	    "Content-type" : "application/json"
    }
  }) 
  const json = await res.json();  
  const profile = json.profile; 
  console.log(profile);  

  profileImage.src = profile.image; 
  userName.value = profile.username; 
  console.log(userName); 
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
  }); 
  const data = await res.json() 
  const productImgName = data["filename"]; 
  return productImgName; 
}

// 프로필 수정내용 업데이트 및 전달
function updateProfile() {
  uploadProfileImage.addEventListener("change", async function(event) {
    const file = uploadProfileImage.files;  
    const imageUrls = []; 
    const imgurl = await imageUpload(file); 
    imageUrls.push(url+"/"+imgurl); 
    console.log(imageUrls); 
    profileImage.src = imageUrls; 
  }); 
  
  // 유저 이름 validation (2~10자) **확인해야함
  userName.addEventListener("change", function(event) { 
    if (userName.value.length === 0) {
      document.querySelector(".input-error").classList.add("on");  
    } else if (userName.value.length < 2) {
      document.querySelector(".input-error").classList.add("on");
    } else if (userName.value.length > 10) {
      document.querySelector(".input-error").classList.add("on");
    }
  })

  // 유저 ID validation (영문, 숫자, 특수문자(.,_)만 사용 가능)
  // 정규표현식 써야함 ^^ 
  userId.addEventListener("change", function(event) { 
    const userIdValidate = []; 
    userIdValidate.push(userId.value); 
    let id = userIdValidate[0].split(""); 
    console.log(arr); 
  
    if (id.includes("")) {
      document.querySelector(".input-error").classList.add("on");  
    } else if (userName.value.length < 2) {
      document.querySelector(".input-error").classList.add("on");
    } else if (userName.value.length > 10) {
      document.querySelector(".input-error").classList.add("on");
    }
  })

}
updateProfile(); 



// async function upadateUserProfile() {
//   const res = await fetch (url + "/user", {
//     method: "PUT", 
//     body: {
//         "Authorization" : `Bearer ${token}`, 
//         "Content-type" : "application/json"
//         }
//     })
// }