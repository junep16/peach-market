const TOKEN = localStorage.getItem("token"); 
const ENDPOINT = "http://146.56.183.55:5050";
const HEADERS = {
  "Authorization" : `Bearer ${TOKEN}`,
  "Content-type" : "application/json"
}

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

  const imageUrl = `${ENDPOINT}/${imageData}`;
  previewImage.src = imageUrl;
  previewImage.classList.remove('hidden');
}


// 이미지 서버에 올리고 preview 이미지 변환
imageInput.addEventListener("change", setPrevImage);

// button 활성화 
function setEnabledBtn() {
  let check = 0;
  inputList.forEach(el => { if (el.value !== "") check++ });
  if (check >= inputList.length-1) {
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
    headers: HEADERS,
    body: JSON.stringify({ product }),
  }
  const res = await fetch(`${ENDPOINT}/product`, reqData);
  console.log(res);
  if (res.ok) {
    location.href = "/views/profile_detail.html";
  } else {
    alert("파일전송에 실패했습니다..");
  }
}


// 상품 상세
// query paramter가 있다면
const queryParam = window.location.search;


// 상품 생성
if (queryParam === "") {
  submitBtn.addEventListener("click", uploadProduct);

} else if (queryParam.split("=")[0] === "?id") {
  // 상품 상세
  const productId = queryParam.split("=")[1];

  async function detailProduct() {
    const reqData = {
      method: "GET",
      headers: HEADERS,
    }
    const res = await fetch(`${ENDPOINT}/product/detail/${productId}`, reqData);
    const resJson = await res.json();

    // 예외 처리
    if (resJson.status === "404") {
      alert(`${resJson.message} 이전 페이지로 이동합니다.`);
      window.history.back();
    } else {
      const { itemImage, itemName, price, link } = resJson.product;
      const [ imageInput, productName, productPrice, productLink ] = inputList;
      
      // 해당 product 값 뿌리기
      previewImage.src = itemImage;
      previewImage.classList.remove("hidden");
      productName.value = itemName;
      productPrice.value = price;
      productLink.value = link;
    }
  }

  // 페이지 로딩될 때 값들 뿌려주기
  window.onload = detailProduct;


  // 상품 수정
  async function updateProduct() {
    const imageUrl = previewImage.src;
  
    // 서버에 보낼 product 데이터 생성
    // inputList = [input#imageInput, input#productName, input#productPrice, input#productLink]
    const product = { "itemImage": imageUrl, };
    [].slice.call(inputList, 1).forEach((el) => { 
      // price인 경우 정수로 변환
      product[el.name] = (el.name === "price") ? parseInt(el.value) : el.value;
    });
  
    const reqData = {
      method: "PUT",
      headers: HEADERS,
      body: JSON.stringify({ product }),
    }
    const res = await fetch(`${ENDPOINT}/product/${productId}`, reqData); 
    if (res.ok) {
      location.href = "/views/profile_detail.html";
    } else {
      alert("파일전송에 실패했습니다..");
    }
  }

  // 상품 수정
  submitBtn.addEventListener("click", updateProduct);
}
