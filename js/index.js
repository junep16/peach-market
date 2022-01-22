const token = localStorage.getItem("token"); 
const postList = document.querySelector("main .post-lists"); 

// 1. 유저 팔로워 피드 받아오기  
async function getPosts() { 
  const url = "http://146.56.183.55:5050"
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
              <button class="img-slide three" type="button"></button></div>
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
    addPostImages(postImage, i); 
  });  
  }

// 2. 이미지 렌더링 하는 함수 (위 68번째 줄에서 실행)
function addPostImages(eachpost, i) {  
  const slides = document.querySelector(`#post${i}`);  
  const li = document.createElement("li"); 
  const img = document.createElement("img"); 
  li.classList.add("post-img-wrap"); 
  img.classList.add("post-img");  
  // 이미지가 하나일 경우
  if (eachpost.length === 1) {
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
    for(let j = 0; j <= eachpost.length - 1 ; j++) {  
      const imgs = document.createElement("img"); 
      imgs.classList.add("post-img"); 
      li.appendChild(imgs); 
      slides.appendChild(li);  
      imgs.src=`${eachpost[j]}`;  

      // 이미지 스타일링
      const postImage = document.querySelector(".post-img"); 
      postImage.style.width = "304px"; 
      postImage.style.height = "228px"; 
      postImage.style.borderRadius = "15px";  
    }  
  } else {
    console.log("이미지 없음"); 
  }  
}

// 3. 이미지 슬라이드  
function handleImageSlide() { 
  const buttonController = document.querySelector(".post-img-button-wrap");   
  const buttonOne = document.querySelector(".img-slide.one"); 
  const buttonTwo = document.querySelector(".img-slide.two"); 
  const buttonThree = document.querySelector(".img-slide.three");

  // 버튼 컨트롤 (누르면 각각 불이 들어오도록)
  buttonController.addEventListener("click", event => { 
    if(buttonOne.classList.contains("on")) {
      buttonOne.classList.toggle("on");  
    } else if (buttonTwo.classList.contains("on")) {
      buttonTwo.classList.toggle("on");
    } else if (buttonThree.classList.contains("on")){
      buttonThree.classList.toggle("on");
    }
    event.target.classList.toggle("on");   
  }); 

  //
  const slides = document.querySelector(".post-img-container"); 
  const slide = document.querySelectorAll(".post-img-container li");  

  let currentIndex = 0; 
  let slideCount = slide.length;  
  let slideWidth = 304; 
  let slideMargin = 20;

  slides.style.width = (slideWidth + slideMargin)*slideCount - slideMargin + "px"; 

  function moveSlide(num) {
    slides.style.left = -num * 324 + "px"; 
    currentIndex = num; 
  }

  // 각각 버튼 누르면 움직이는 부분
  buttonOne.addEventListener("click", event => { 
    moveSlide(0);  
  }); 
  
  buttonTwo.addEventListener("click", event => {
    currentIndex = 0;
    moveSlide(currentIndex +1);  
  }); 
  buttonThree.addEventListener("click", event => {
    currentIndex = 1;
    moveSlide(currentIndex +1);  
  });  
} 

// 비동기적으로 각각의 함수 실행
async function init() {
  // 포스팅 데이터 먼저 렌더
  await getPosts(); 
  // 이후 이미지 슬라이더 작동
  // handleImageSlide(); 
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


