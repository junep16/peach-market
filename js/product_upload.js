const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxY2E2MzhhYjVjNmNkMTgwODRlNDQ3ZCIsImV4cCI6MTY0NzE4MzkyNCwiaWF0IjoxNjQxOTk5OTI0fQ.gGHALhJfzegmSJafhze2TIeds_De5h1k4mE4gB3czEo";
const ENDPOINT = "http://146.56.183.55:5050";


const inputList = document.querySelectorAll(".product-app input");
const submitBtn = document.querySelector("#submitBtn");
const previewImage = document.querySelector(".preview-image");
const ProductApp = document.querySelector(".product-app");
const imageInput = document.querySelector("#imageInput");

// 서버에 이미지 올리기
async function uploadImage(formData) {
  const res = await fetch(`${ENDPOINT}/image/uploadfile`, {
      method: "POST",
      body: formData
  });
  const data = await res.json();
  return data.filename;
}

// prevImage 변경
async function setPrevImage() {
  const formData = new FormData();
  formData.append("image", imageInput.files[0]);
  
  // 서버 통신으로 받은 이미지로 prev-image 변경
  const imageData = await uploadImage(formData); // filename 반환

  const imageUrl = `${ENDPOINT}/${imageData}`
  previewImage.src = imageUrl;
  previewImage.classList.remove('hidden');
}

imageInput.addEventListener("change", setPrevImage);


// button 활성화 
function setEnabledBtn() {
  let check = 0;
  inputList.forEach(el => { if (el.value !== "") check++ });

  if (check === inputList.length) {
    submitBtn.className = "ms-button";
    submitBtn.disabled = false;
  } else {
    submitBtn.className = "ms-disabled-button";
    submitBtn.disabled = true;
  }
}

// 버튼 활성화
ProductApp.addEventListener("keyup", setEnabledBtn);


// 상품 생성
async function uploadProduct() {
  const imageUrl = previewImage.src;

  // 서버에 보낼 product 데이터 생성
  // inputList = [input#imageInput, input#productName, input#productPrice, input#productLink]
  const product = { "itemImage": imageUrl, };
  [].slice.call(inputList, 1).forEach((el) => { 
    // price인 경우 정수로 변환
    product[el.name] = (el.name === "price") ? parseInt(el.value) : el.value;
  });

  const reqData = {
    method: "POST",
    headers: {
      "Authorization" : `Bearer ${TOKEN}`,
      "Content-type" : "application/json"
    },
    body: JSON.stringify({ product }),
  }
  const res = await fetch(`${ENDPOINT}/product`, reqData);
  console.log(res);
  // if (res.ok) {
  //   location.href = "/views/your_profile";
  // } else {
  //   alert("파일전송에 실패했습니다..");
  // }
}

// 상품 생성
submitBtn.addEventListener("click", uploadProduct);


// 상품 수정

