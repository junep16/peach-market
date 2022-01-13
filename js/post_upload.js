const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxY2E2MzhhYjVjNmNkMTgwODRlNDQ3ZCIsImV4cCI6MTY0NzE0MzQ1MCwiaWF0IjoxNjQxOTU5NDUwfQ.MPLwiebPtzC4JjWF3UqCT01v-IeUhNtT8JQ05Kp3gXA"; 

const textContent = document.querySelector("textarea"); 
const imageUploadButton = document.querySelector("#image-upload");
const submitButton = document.querySelector("#submit-button"); 
const uploadImageList = document.querySelector(".post-image-list"); 

// 0. 유저 데이터 뿌리기 (프로필이미지)

// 1. 이미지 업로드
async function imageUpload(files,index){
  const formData = new FormData();
  formData.append("image", files[index]); 

  const res = await fetch(`http://146.56.183.55:5050/image/uploadfile`, {
    method: "POST",
    body : formData
  })
  const data = await res.json() 
  const productImgName = data["filename"];
  return productImgName;
}

// 2. 피드 작성 
async function createPost(event) {
  const url = "http://146.56.183.55:5050"; 
  const content = textContent.value; 
  const files = imageUploadButton.files;  
  console.log(content); 
  console.log(files); 
  
  const imageUrls = []; 

  if (files.length <= 3) {
    for(let i = 0; i < files.length; i++) {
      const imgurl = await imageUpload(files, i); 
      imageUrls.push(url+"/"+imgurl);  
    }
    const res = await fetch(url+"/post",{
      method:"POST",
      headers:{
        "Authorization" : `Bearer ${token}`,
        "Content-type" : "application/json"
      },
      body:JSON.stringify({
        "post": {
          "content": content,
          "image": imageUrls+''  
          }
      })
  })
  } else {
    alert("투마치"); 
  }; 
  // imageUrls.forEach( (image) => {
  //   let singleImage = image; 
  //   console.log(singleImage); 
  //   uploadImageList.innerHTML+=
  //   `
  //   <li class="post-image">
  //     <img src=${image}>
  //     <button class="image-delete" type="button"> 
  //     <span class="text-hide">이미지 제거</span>
  //     </button>
  //   </li> 
  //   `
  // }) 

}
submitButton.addEventListener("click",createPost); 
imageUploadButton.addEventListener("click", addUploadImages); 

// 3. 이미지 보여주기
const uploadedImageList = document.querySelector(".post-image-list"); 

async function addUploadImages(imageurl) {

  imageUrls.forEach( (image) => {
    let singleImage = image; 
    console.log(singleImage); 
    uploadImageList.innerHTML+=
    `
    <li class="post-image">
      <img src=${image}>
      <button class="image-delete" type="button"> 
      <span class="text-hide">이미지 제거</span>
      </button>
    </li> 
    `
  }) 
  // const url = "http://146.56.183.55:5050";
  
  // const response = await fetch(imageurl, {
  //   method: "GET", 
  //   headers: {
  //     "Authorization": `Bearer ${token}`,  
  //     "Content-type" : "application/json"
  //   } 
  // })
  // const json = await response.json(); 
  // const images = json;    
  // console.log(images); 
} 

