//우측상단 버튼
const pfModal = document.querySelector('.pf-modal');
const moreBtn = document.querySelector('.more-btn');

moreBtn.addEventListener('click', function () {
  pfModal.classList.toggle('on');
});

//로그아웃 팝업
const logoutBtn = document.querySelector('.logout-btn');
const modalLogout = document.querySelector('.modal-logout');
const logoutCancle = document.querySelector('.logout-cancle');

logoutBtn.addEventListener('click', function () {
  modalLogout.classList.add('on');
})
logoutCancle.addEventListener('click', function () {
  modalLogout.classList.remove('on');
  pfModal.classList.remove('on');
})

//팔로우 버튼
const followBtn = document.querySelector('.m-button');
const unfollowBtn = document.querySelector('.m-activ-button');
followBtn.addEventListener('click', function () {
  followBtn.classList.toggle('on');
  unfollowBtn.classList.toggle('on');
})
unfollowBtn.addEventListener('click', function () {
  followBtn.classList.toggle('on');
  unfollowBtn.classList.toggle('on');
})

//팔로워 리스트 버튼
const follwerListBtn = document.querySelector('.pf-followes p');
const follwerPrevBtn = document.querySelector('.pf-followers-list .prev-btn');
follwerListBtn.addEventListener('click', function () {
  document.querySelector('.pf-followers-list').classList.add('on');
})
follwerPrevBtn.addEventListener('click', function () {
  document.querySelector('.pf-followers-list').classList.remove('on');
})

//팔로잉 리스트 버튼 
const follwingListBtn = document.querySelector('.pf-followings p');
const follwingPrevBtn = document.querySelector('.pf-following-list .prev-btn');
follwingListBtn.addEventListener('click', function () {
  document.querySelector('.pf-following-list').classList.add('on');
})
follwingPrevBtn.addEventListener('click', function () {
  document.querySelector('.pf-following-list').classList.remove('on');
})

document.addEventListener('click', function (e) {
  if (e.target.className === 's-button') {
    e.target.classList.remove('s-button');
    e.target.classList.add('s-activ-button');
    e.target.innerText = "취소";
  } else if (e.target.className === 's-activ-button') {
    e.target.classList.remove('s-activ-button');
    e.target.classList.add('s-button');
    e.target.innerText = "팔로우";
  }
});


const listBtn = document.querySelector('.list-btn');
const albumBtn = document.querySelector('.album-btn');
const listPost = document.querySelector(' ul.list-post');
const albumPost = document.querySelector(' ul.album-post');

listBtn.addEventListener('click', function () {
  if (listBtn.classList.contains('on') === true) {
    return;
  } else {
    listBtn.classList.add('on');
    albumBtn.classList.remove('on')
    listPost.classList.add('on');
    albumPost.classList.remove('on');
  }
});
albumBtn.addEventListener('click', function () {
  if (albumBtn.classList.contains('on') === true) {
    return;
  } else {
    albumBtn.classList.add('on');
    listBtn.classList.remove('on');
    listPost.classList.remove('on');
    albumPost.classList.add('on');
  }
});

document.querySelector('.pf-home-post .more-btn').addEventListener('click', function(){
  document.querySelector('.pf-modify-modal').classList.toggle('on')
});