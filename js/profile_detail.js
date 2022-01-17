const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZGJmNmNmZWEwN2Q2MTY2NmNmMzc0MCIsImV4cCI6MTY0NzI2MjQ4NCwiaWF0IjoxNjQyMDc4NDg0fQ.wGrxyPvC84igCS8I9pfKMjvzSBMRlADRAYtonNJ0zUk";


async function getProfile() {
  const url = `http://146.56.183.55:5050/profile/${username}`;
  // const token = localStorage.getItem("Token")
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json"
    }
  })
  const json = await res.json()
  // console.log(json);
  document.querySelector('.pf-userprofile div:first-child').innerHTML = `
  <ul>
    <li class="pf-followes">
      <p>${json.profile.followerCount}</p>
      <p>followers</p>
    </li>
    <li class="pf-img">
      <img src="${json.profile.image}" alt="프로필이미지">
    </li>
    <li class="pf-followings">
      <p>${json.profile.followingCount}</p>
      <p>followings</p>
    </li>
  </ul>
  <h3>${json.profile.username}</h>
  <p class="pf-id">@ ${json.profile.accountname}</p>
  <p class="pf-description">${json.profile.intro}</p>
  `
  followerList();
  followingList();
}

async function getFollowing() {
  const url = `http://146.56.183.55:5050/profile/${username}/following`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json"
    }
  })
  const json = await res.json();
  json.forEach(following => {
    document.querySelector('.pf-following-list ul').innerHTML += `
    <li>
    <figure>
      <img src="${following.image}" alt="" width="28px">
      <figcaption>
      <a href="profile_detail.html?id=${following.accountname}">
        <p>${following.username}</p>
        <small>${following.intro}</small>
        </a>
      </figcaption>
    </figure>
    <button type="button" class="s-button">팔로우</button>
  </li>
    `
  });
}

async function getFollowers() {
  const url = `http://146.56.183.55:5050/profile/${username}/follower`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json"
    }
  })
  const json = await res.json();
  // console.log(json);
  json.forEach(follower => {
    document.querySelector('.pf-followers-list ul').innerHTML += `
    <li>
      <figure>
        <img src="${follower.image}" alt="" width="28px">
        <figcaption>
          <a href="profile_detail.html?id=${follower.accountname}">
            <p>${follower.username}</p>
            <small>${follower.intro}</small>
          </a>
        </figcaption>
      </figure>
      <button type="button" class="s-button">팔로우</button>
    </li>
    `
  })
}

function followerList() {
  //팔로잉 리스트 버튼 
  const follwingListBtn = document.querySelector('.pf-followings p');
  const follwingPrevBtn = document.querySelector('.pf-following-list .prev-btn');
  follwingListBtn.addEventListener('click', function () {
    console.log("hello");
    document.querySelector('.pf-following-list').classList.add('on');
  })
  follwingPrevBtn.addEventListener('click', function () {
    document.querySelector('.pf-following-list').classList.remove('on');
  })
}

function followingList() {
  //팔로워 리스트 버튼
  const follwerListBtn = document.querySelector('.pf-followes p:first-child');
  const follwerPrevBtn = document.querySelector('.pf-followers-list .prev-btn');
  follwerListBtn.addEventListener('click', function () {
    document.querySelector('.pf-followers-list').classList.add('on');
  })
  follwerPrevBtn.addEventListener('click', function () {
    document.querySelector('.pf-followers-list').classList.remove('on');
  })
}

async function getProduct() {
  const url = `http://146.56.183.55:5050/product/${username}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json"
    }
  })
  const json = await res.json()
  const product = json.product;
  console.dir(product);
  if (product.length) {
    product.forEach(product => {
      document.querySelector('.pf-product ul').innerHTML += `
      <li class="product">
      <a class="atag" href="${product.link}">
        <img src="${product.itemImage}" alt="상품 이미지" class="product-img" width="140px" height="90px">
        <strong class="product-name">${product.itemName}</strong>
        <span class="product-price">${product.price}</span>
      </a>
      </li>
    `
    })
  } else {
    document.querySelector('.pf-product').classList.add('off')
  }

  document.querySelector('.atag').addEventListener('click', function (e) {
    if(username == localStorage.keys){
    e.preventDefault()
    }
  })

}

async function getPost() {
  const url = `http://146.56.183.55:5050/post/${username}/userpost`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json"
    }
  })
  const json = await res.json()
  const post = json.post;
  console.dir(post.length)
  if (post.length) {
    post.forEach(post => {
      if (post.image) {
        document.querySelector('.list-post').innerHTML += `
    <li class="home-post">
      <img src="${post.author.image}" alt="프로필 사진" class="avatar-img">
      <div>
        <p class="content-wrap">
          <a href="#none">
            <strong>${post.author.username}</strong>
            <span>@ ${post.author.accountname}</span>
          </a>
          <button type="button" class="more-btn">
            <span class="text-hide">설정 더보기 버튼</span>
          </button>
        </p>
        <p class="post-content">${post.content}</p>
        <img src="${post.image}" alt="포스트 사진" class="post-img">
        <button type="button" class="heart-btn" data-count="58">${post.heartCount}</button>
        <button type="button" class="comment-btn" data-count="12">${post.commentCount}</button>
        <span class="upload-date">${post.createdAt}</span>
      </div>
    </il>
    `
        document.querySelector('.album-post').innerHTML += `
    <li><img src="${post.image}" alt="포스트 사진" class="post-img"></li>
    `
      } else {
        document.querySelector('.list-post').innerHTML += `
    <li class="home-post">
      <img src="${post.author.image}" alt="프로필 사진" class="avatar-img">
      <div>
        <p class="content-wrap">
          <a href="#none">
            <strong>${post.author.username}</strong>
            <span>@ ${post.author.accountname}</span>
          </a>
          <button type="button" class="more-btn">
            <span class="text-hide">설정 더보기 버튼</span>
          </button>
        </p>
        <p class="post-content">${post.content}</p>
        <button type="button" class="heart-btn" data-count="58">${post.heartCount}</button>
        <button type="button" class="comment-btn" data-count="12">${post.commentCount}</button>
        <span class="upload-date">${post.createdAt}</span>
      </div>
    </li>
    `
      }
    })
  } else {
    document.querySelector('.pf-home-post').classList.add('off');
  }
  document.addEventListener('click', function (e) {
    if (e.target.className === 'more-btn') {
      document.querySelector('.pf-modify-modal').classList.toggle('on')
    }
  }, );
}

//우측상단 버튼
const pfModal = document.querySelector('.pf-modal');
const moreBtn = document.querySelector('.top-basic-nav .more-btn');

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

document.addEventListener('click', function (e) {
  if (e.target.className == 'm-button') {
    console.log("hello")
    e.target.classList.remove('m-button');
    e.target.classList.add('m-activ-button');
    e.target.innerText = "언팔로우";
  } else if (e.target.className === 'm-activ-button') {
    e.target.classList.remove('m-activ-button');
    e.target.classList.add('m-button');
    e.target.innerText = "팔로우";
  }
});

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

//홈포스트 리스트 앨범 
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
    albumPost.classList.add('off');
  }
});
albumBtn.addEventListener('click', function () {
  if (albumBtn.classList.contains('on') === true) {
    return;
  } else {
    albumBtn.classList.add('on');
    listBtn.classList.remove('on');
    listPost.classList.remove('on');
    albumPost.classList.remove('off');
  }
});


const myUserName = localStorage.keys;
let username = searchParam("id");
console.log(myUserName);
console.log(username);
// 쿼리를 포함한 url에서 key 값을 통해 value를 가져옵니다.
function searchParam(key) {
  return new URLSearchParams(location.search).get(key);
}

if (username) {
  getProfile();
  getFollowing();
  getFollowers();
  getProduct();
  getPost();
  document.querySelector('.pf-sns').classList.remove('off');
} else {
  username = localStorage.keys;
  getProfile();
  getFollowing();
  getFollowers();
  getProduct();
  getPost();
  document.querySelector('.pf-modify').classList.remove('off');
}