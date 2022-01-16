const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxY2E2MzhhYjVjNmNkMTgwODRlNDQ3ZCIsImV4cCI6MTY0NzE0MzQ1MCwiaWF0IjoxNjQxOTU5NDUwfQ.MPLwiebPtzC4JjWF3UqCT01v-IeUhNtT8JQ05Kp3gXA"; 
const url = "http://146.56.183.55:5050"; 



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

  const profileImage = document.querySelector(".profile-image"); 
  const userName = document.querySelector(".user-name"); 
  const userId = document.querySelector(".input-id"); 
  const userIntro = document.querySelector("#user-introduction"); 

  profileImage.src = profile.image; 
  userName.value = profile.username; 
  console.log(userName); 
  userId.value = profile.accountname; 
  userIntro.value = profile.intro; 
}
getUserProfile(); 

function updateProfile() {
  const uploadProfileImage = document.querySelector("#upload-image"); 
  const profileImage = uploadProfileImage.files;
  
  uploadProfileImage.addEventListener("change", (event) => {
    
  })
  
}



// async function upadateUserProfile() {
//   const res = await fetch (url + "/user", {
//     method: "PUT", 
//     body: {
//         "Authorization" : `Bearer ${token}`, 
//         "Content-type" : "application/json"
//         }
//     })
// }