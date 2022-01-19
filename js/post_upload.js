const token = localStorage.getItem("token"); 
const textContent = document.querySelector("textarea"); 
const imageUploadButton = document.querySelector("#image-upload");
const submitButton = document.querySelector("#submit-button"); 
const uploadImageList = document.querySelector(".post-image-list"); 


// 유저 프로필사진 가져오기

// 이미지 업로드시 프리뷰 및 삭제
function handleUploadImages() {
  imageUploadButton.addEventListener("change", async function(event) {
    const file = imageUploadButton.files; 
    const url = "http://146.56.183.55:5050"; 
    console.log(file); 
    const imageUrls = []; 
    if (file.length <= 3) {
      for(let i = 0; i < file.length; i++) {
        const imgurl = await imageUpload(file, i); 
        imageUrls.push(url+"/"+imgurl);   
        console.log(imageUrls); 
        uploadImageList.innerHTML+=
        `
        <li class= "post-image" id="image${i}">
          <img src=${imageUrls[i]} class= "selected-image">
          <button class="image-delete ${i}" type="button"> 
          <span class="text-hide">이미지 제거</span>
          </button>
        </li> 
        `
      }
    } else if (file.length > 3) {
      alert("이미지가 너무 많아염 (3개만 선택)"); 
    }
    deleteImages(); 
    })
  }  
  handleUploadImages();

// 이미지 삭제 로직
function deleteImages() { 
  const imageOne = document.querySelector("#image0");  
  const imageTwo = document.querySelector("#image1");
  const imageThree = document.querySelector("#image2");  

  uploadImageList.addEventListener("click", (event) => {
    if (event.target.className == "image-delete 0"){ 
      imageOne.remove(); 
    } else if (event.target.className == "image-delete 1"){ 
      imageTwo.remove(); 
    } else if (event.target.className == "image-delete 2"){ 
      imageThree.remove(); 
    }
  })   
} 

// 이미지 업로드
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

// 피드 작성 및 전송 
async function createPost(event) {
  const url = "http://146.56.183.55:5050"; 
  const content = textContent.value;  
  const selectedImages = document.querySelectorAll(".selected-image"); 
  const selectedImageUrls = [];
  
  // 텍스트 작성 여부 확인
  if (content == "") { 
    throw alert("내용을 입력해주세요"); 
  }

  if (selectedImages.length <= 3) {
     // li src url 배열에 담기
    for(i = 0; i <= selectedImages.length-1; i++) {
      // img태그 src 가져오기
      const imgurl = selectedImages[i].src;  
      selectedImageUrls.push(imgurl);  
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
          "image": selectedImageUrls+''  
          }
      })
  })
  const json = await res.json();
  console.log(json);
  } else {
    alert("투마치"); 
  }; 
  location.href = "/index.html"; 
}
submitButton.addEventListener("click",createPost);   

