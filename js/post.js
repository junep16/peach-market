const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxY2E2MzhhYjVjNmNkMTgwODRlNDQ3ZCIsImV4cCI6MTY0NzE4MzkyNCwiaWF0IjoxNjQxOTk5OTI0fQ.gGHALhJfzegmSJafhze2TIeds_De5h1k4mE4gB3czEo";
const ENDPOINT = "http://146.56.183.55:5050";
const HEADERS = {
  "Authorization" : `Bearer ${TOKEN}`,
  "Content-type" : "application/json"
}
// 차후 수정 예정 
const postId = "61e067737f959cdb66eb296d";

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
async function uploadComment() {
  const comment = { content: commentInput.value }
  await fetch(`${ENDPOINT}/post/${postId}/comments`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({comment})
  });
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
