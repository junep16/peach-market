const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxY2E2MzhhYjVjNmNkMTgwODRlNDQ3ZCIsImV4cCI6MTY0NzE0MzQ1MCwiaWF0IjoxNjQxOTU5NDUwfQ.MPLwiebPtzC4JjWF3UqCT01v-IeUhNtT8JQ05Kp3gXA"; 

const postList = document.querySelector("main .post-lists"); 

// TODO
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

posts.forEach( post => { 
  const authorImage = post.author.image;   
  const authorAccount = post.author.accountname; 
  const authorName = post.author.username;  
  const postContent = post.content;  
  const postImage = post.image.split(",");   
  console.log(postImage); 
  const postDate = post.createdAt.split('T')[0]; 
  const commentCount = post.commentCount; 
  const heartCount = post.heartCount;
  const hearted = post.hearted;   
  postList.innerHTML+=`
  <li>
    <div class="home-post">
      <img src= ${authorImage} alt="프로필 사진" class="avatar-img">
      <div>
        <div class="content-wrap">
          <a href="#none">
            <strong>${authorName}</strong>
            <span>@ ${authorAccount}</span>
          </a>
          <button type="button" class="more-btn">
            <span class="text-hide">설정 더보기 </span>
          </button>
        </div>
        <p class="post-content">${postContent}</p>
        <div class="post-img-window">
          <ul class="post-img-container"></ul>
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
    <span class="upload-date">${postDate}</span> 
  </li> 
`
addPostImages(postImage); 
});  


}

function addPostImages(eachpost) {
  const slides = document.querySelector(".post-img-container");  
  const li = document.createElement("li"); 
  const img = document.createElement("img"); 
  li.classList.add("post-img-wrap"); 
  img.classList.add("post-img"); 

  if (eachpost.length === 1) {
    img.src=`${eachpost[0]}`
    li.appendChild(img); 
    slides.appendChild(li); 
    console.log("하나지롱");
  } else if (eachpost.length > 1) {
    for(i = 0; i <= eachpost.length; i++) {
      img.src=`${eachpost[i]}`
      li.appendChild(img); 
      slides.appendChild(li); 
      console.log("여러개지롱");
    }  
  } else {
    console.log("이미지 없음"); 
  }
}


// *** 이미지 슬라이드 *** 
function handleImageSlide() { 
  const buttonController = document.querySelector(".post-img-button-wrap");   
  const buttonOne = document.querySelector(".img-slide.one"); 
  const buttonTwo = document.querySelector(".img-slide.two"); 
  const buttonThree = document.querySelector(".img-slide.three");

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

  // 슬라이드 컨트롤
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

async function init() {
  await getPosts(); 
  handleImageSlide(); 
}
init();

// *** 이미지 슬라이드 *** 
