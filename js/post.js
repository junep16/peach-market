const TOKEN = localStorage.getItem("token"); 
const ENDPOINT = "http://146.56.183.55:5050";
const HEADERS = {
  "Authorization" : `Bearer ${TOKEN}`,
  "Content-type" : "application/json"
}
// 차후 수정 예정  
function searchParam(key) {
  return new URLSearchParams(location.search).get(key); 
}
const postId = searchParam("id"); 

const commentForm = document.querySelector("form");
const commentInput = document.querySelector("form #commentInput");
const commentBtn = document.querySelector("form .comment-submit-btn");


// 댓글 게시 버튼 활성화
function stateHandle() {
  if (commentInput.value === "") {
    commentBtn.disabled = true;
    commentBtn.classList.remove("enabled")
  } else {
    commentBtn.disabled = false;
    commentBtn.classList.add("enabled")
  }
};

// 댓글 작성 함수
async function uploadComment(event) { 
  const comment = { content: commentInput.value }
  const res = await fetch(`${ENDPOINT}/post/${postId}/comments`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({comment})
  });
  location.href = `/views/post.html?id=${postId}`; 
};

// 댓글 작성하기
commentInput.addEventListener("keyup", stateHandle);
commentBtn.addEventListener("click", uploadComment);


// 현재 시간 반환 함수
function getDateFunction () {
  const date = new Date();
  const month = date.getMonth()+1;
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  return [month, day, hour, min];
}

// 업데이트된 날짜와 현재 날짜 비교 함수
function checkCompareTime (strDateList) {
  const DateList = getDateFunction();
  let unit = ["월", "일", "시", "분"];
  for (let i = 0; i < DateList.length; i++) {
    let time = DateList[i] - parseInt(strDateList[i]);
    if (time !== 0) { return `${time}${unit[i]}`; }
  }
  return "방금";
}

// 댓글 리스트 불러오기
async function getCommentList() {
  const reqOption = {
    method: "GET",
    headers: HEADERS,
  }
  const res = await fetch(`${ENDPOINT}/post/${postId}/comments`, reqOption);
  const json = await res.json();
  const commentList = document.querySelector(".comment-list");
  // 예외처리
  if (json.status === 404) {
    // 404 페이지 이동 로직 추가 예정
    // location.href = "/views/error.html";
    alert(json.message);
  } else {
    json.comments.forEach((el) => {
      const { author, content, createdAt, id } = el;
      const [ date, time ] = createdAt.split("T");
      const [ year, month, day ] = date.split("-");
      const [ hour, min, sec ] = time.split(":");
      const strDateList = [ month, day, hour, min ];
      const compareTime = checkCompareTime(strDateList);
      commentList.innerHTML += `
        <li class="comment-card">
          <div class="comment-info">
            <div class="image-wrapper">
              <img src="${author.image}" alt="프로필 이미지">
            </div>
            <p> ${author.username}<span>${compareTime} 전</span></p>
            <button id=${id} class="button-more" type="button">
              <span class="text-hide">설정 더보기</span>
            </button>
          </div>
          <p class="comment-detail">${content}</p>
        </li>
      `;
    });
  }
}

// 페이지 로드 될 때 댓글 리스트 불러오기
window.onload = getCommentList;

// 댓글 모달창 끄고 켜기
const commentList = document.querySelector(".comment-list");
const modal = document.querySelector(".more-modal")
const commentDeleteBtn = document.querySelector(".more-modal .delete-button");

// 댓글 삭제 함수 
async function deleteComment(commentId) {
  if (confirm("정말 삭제하시겠습니까?")) {
    const reqOption = {
      method: "DELETE",
      headers: HEADERS
    }
    const res = await fetch(`${ENDPOINT}/post/${postId}/comments/${commentId}`, reqOption);
    const json = await res.json();
    alert(json.message)
  }
}
async function sendFeedback(commentId) {
  if (confirm("정말 신고하시겠습니까?")) {
    const reqOption = {
      method: "GET",
      headers: HEADERS
    }
    const res = await fetch(`${ENDPOINT}/post/${postId}/comments/${commentId}/report`, reqOption);
    const json = await res.json();
    alert(json.message)
  }
}

// 댓글 삭제하기
commentList.addEventListener("click", (event) => {
  if (event.target.className === "button-more") {
    modal.style.display = "block";
    const commentId = event.target.id;

    modal.addEventListener("click", (event) => {
      const currentNode = event.target;
      if (currentNode.className === "send-feedback-button") {
        // 신고하기 버튼
        sendFeedback(commentId);
      } else if (currentNode.className === "delete-button") {
        // 댓글 지우기 버튼
        deleteComment(commentId);
      } else {
        // 모달창 닫기 버튼
        modal.style.display = "none";
      }
    });
  }
});


// 해당 포스트 불러오기 
const postList = document.querySelector("main .post-lists"); 

async function getPost() { 
  const url = "http://146.56.183.55:5050"
  const response = await fetch(url+"/post/"+postId, {
    method: "GET", 
    headers: HEADERS, 
  })
  const json = await response.json();  
  const post = json.post;  

  const authorImage = post.author.image; 
  const authorAccount= post.author.accountname; 
  const authorName = post.author.username; 
  const postImage = post.image.split(",");  
  const postContent = post.content;   
  const postDate = post.createdAt.split('T')[0].split("-"); 
  console.log(postDate); 
  const heartCount = post.heartCount;
  const commentCount = post.commentCount; 
  const hearted = post.hearted;   

  postList.innerHTML+=`
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
          <ul id="post" class="post-img-container"></ul>
          <div class="post-img-button-wrap">
            <button class="img-slide one on" type="button"></button>
            <button class="img-slide two" type="button"></button>
            <button class="img-slide three" type="button"></button></div>
          </div>
        </div>
      </div>
    </div> 
    <div class="post-button-wrap">
      <button type="button" class="heart-btn" data-count="58">${heartCount}
        <span class="text-hide">좋아요</span>
      </button>
      <button type="button" class="comment-btn" data-count="12">${commentCount}
        <span class="text-hide">댓글</span>
      </button>
    </div>
    <span class="upload-date">${postDate}</span> 
    </div>  
  `
    console.log(postImage); 
    addPostImages(postImage);     
  }

// 2. 이미지 렌더링 하는 함수 (위 68번째 줄에서 실행)
function addPostImages(eachpost) {  
  const slides = document.querySelector(`#post`);  
  const li = document.createElement("li"); 
  const img = document.createElement("img"); 
  li.classList.add("post-img-wrap"); 
  img.classList.add("post-img"); 
  console.log(slides); 
  
  if (eachpost.length === 1) {
    img.src=`${eachpost[0]}`
    li.appendChild(img); 
    slides.appendChild(li); 
    console.log("하나지롱");
  } else if (eachpost.length > 1) {
    for(let j = 0; j <= eachpost.length -1; j++) {
      img.src=`${eachpost[j]}`
      const lis = document.createElement("li");
      const imgs = document.createElement("img");
      lis.classList.add("post-img-wrap"); 
      imgs.classList.add("post-img"); 
      imgs.style.width = "304"; 
      imgs.style.height = "228"; 
      lis.appendChild(imgs); 
      slides.appendChild(lis); 
      console.log("여러개지롱"); 
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
  await getPost(); 
  // 이후 이미지 슬라이더 작동
  handleImageSlide(); 
  postButtonControl();
}
init();

// 좋아요 버튼 컨트롤 

function postButtonControl() {
  const buttonControl = document.querySelector(".post-button-wrap"); 
  const likeButton = document.querySelector(".heart-btn");
  let likeCount = parseInt(likeButton.innerText.split("")[0]);  

  likeButton.addEventListener("click", event => {
    if(event.target.className = "heart-btn") {
      event.target.classList.add("on"); 
      event.target.innerText =  likeCount + 1; 
    }
  })
}

