const token = localStorage.getItem("token"); 
const postList = document.querySelector("main .post-lists"); 
const ENDPOINT = "https://api.mandarin.cf";

const HEADERS = {
  "Authorization": `Bearer ${token}`,
  "Content-type": "application/json",
};

// access check function
async function accessCheck() {
  const URL = `${ENDPOINT}/user/checktoken`;
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


let slideWidth = 304; 
let slideMargin = 20;

// 1. 유저 팔로워 피드 받아오기  
async function getPosts() { 
  const url = "https://api.mandarin.cf";
  const response = await fetch(url+"/post/feed", {
    method: "GET", 
    headers: {
      "Authorization": `Bearer ${token}`,  
      "Content-type" : "application/json"
    } 
  })
  const json = await response.json(); 
  const posts = json.posts;  

  posts.forEach( (post, i) => {
    const authorImage = post.author.image;   
    const authorAccount = post.author.accountname; 
    const authorName = post.author.username;  
    const postContent = post.content;  
    const postImage = post.image.split(","); 
    const postDate = post.createdAt; 
    const commentCount = post.commentCount; 
    const heartCount = post.heartCount;
    const hearted = post.hearted;   
    postList.innerHTML+=`
    <li>
      <div class="home-post">
        <img src= ${authorImage} alt="프로필 사진" class="avatar-img">
        <div>
          <div class="content-wrap">
            <a href="/views/profile_detail.html?id=${authorAccount}">
              <strong>${authorName}</strong>
              <span>@ ${authorAccount}</span>
            </a>
            <button type="button" class="more-btn">
              <span class="text-hide">설정 더보기 </span>
            </button>
          </div>
          <p class="post-content">${postContent}</p>
          <div class="post-img-window">
            <ul id="post${i}" class="post-img-container"></ul>
            <div class="post-img-button-wrap">
              <button class="img-slide one on" type="button"></button>
              <button class="img-slide two" type="button"></button>
              <button class="img-slide three" type="button"></button>
            </div>
          </div>
        </div>
      </div>
      <div class="post-button-wrap">
        <button type="button" class="heart-btn" data-count="58">
          <span class="text-hide">좋아요</span>
          ${heartCount}
        </button>
        <button type="button" class="comment-btn" data-count="12">
          <span class="text-hide">댓글</span>
          ${commentCount}
        </button>
      </div>
      <span class="upload-date">${postDate.slice(0,4)}년 ${postDate.slice(5,7)}월 ${postDate.slice(8,10)}일</span> 
    </li> 
  ` 
    if(post.image) {
      addPostImages(postImage, i); 
      if (i === 3) {
        console.log(postImage); 
      }
    }

  });  
  }

// 2. 이미지 렌더링 하는 함수 (위 68번째 줄에서 실행)
function addPostImages(eachpost, i) {  
  const slides = document.querySelector(`#post${i}`);  //ul

  // 이미지가 하나일 경우
  if (eachpost.length === 1) {

    const li = document.createElement("li"); 
    const img = document.createElement("img"); 
    li.classList.add("post-img-wrap"); 
    img.classList.add("post-img");  
    img.src =`${eachpost[0]}`
    li.appendChild(img); 
    slides.appendChild(li); 

    const postImage = document.querySelector(".post-img"); 
    postImage.style.width = "304px"; 
    postImage.style.height = "228px"; 
    postImage.style.borderRadius = "15px"; 
    const buttonController = document.querySelector(".post-img-button-wrap");
    buttonController.classList.add("off");  

  } //이미지 여러개일 경우
    else if (eachpost.length > 1) {
    for(let j = 0; j < eachpost.length; j++) {   
      const li = document.createElement("li"); 
      const img = document.createElement("img"); 
      li.classList.add("post-img-wrap");
      img.classList.add("post-img"); 

      li.appendChild(img); 
      slides.appendChild(li);  
      img.src=`${eachpost[j]}`;  
      console.log(slides); 

      // 이미지 스타일링
      const postImage = document.querySelector(".post-img"); 
      postImage.style.width = "304px"; 
      postImage.style.height = "228px"; 
      postImage.style.borderRadius = "15px";  
    }  
  } else {
    console.log("이미지 없음"); 
  }   
  slides.style.width = (slideWidth + slideMargin)*slides.childElementCount - slideMargin + "px"; 
}

function moveSlide(num, slides) {
  slides.style.left = -num * 324 + "px";  
} 

function imageSlideControl() {
  postList.addEventListener("click", (event) => {
    const currentNode = event.target; 
    const currentClass = currentNode.className; 

    if(currentNode.tagName === "BUTTON" && currentClass !== "more-btn") { 
      const slides = currentNode.parentElement.previousElementSibling;  
      const buttonList = currentNode.parentElement.children;   
      
      let moveIndex; 
      for (let i = 0; i < buttonList.length; i++) { 
        if(buttonList[i].classList.contains("on")) {
          buttonList[i].classList.remove("on");  
        }
        else if (currentNode === buttonList[i]) {
          moveIndex = i; 
        } 
      }
      currentNode.classList.add("on");  
      moveSlide(moveIndex, slides); 
    }; 
  }) 
}
imageSlideControl(); 


// 3. 이미지 슬라이드  

// 비동기적으로 각각의 함수 실행
async function init() {
  // 포스팅 데이터 먼저 렌더
  await getPosts();  
}
init();

// 화면 내 버튼 컨트롤
const searchButton = document.querySelector(".search-btn"); 
const bottomNavBar = document.querySelector(".tab-menu"); 

// 검색 페이지로 이동
searchButton.addEventListener("click", () => {
  location.href = "/views/search.html"; 
}) 


// 하단 페이지 네비게이션 
bottomNavBar.addEventListener("click", event => {
  if (event.target.className === "chat-tab") { 
    location.href = "/views/chat_list.html";
  } else if (event.target.className === "post-tab") { 
    location.href = "/views/post_upload.html";
  } else if (event.target.className === "profile-tab") { 
    location.href = "/views/profile_detail.html";
  } else if (event.target.className === "home-tab") { 
    location.href = "/index.html";
  }
})


