const slide = document.querySelector(".slide");
let slideWidth = slide.clientWidth;
const prevBtn = document.querySelector(".slide_prev_button");
const nextBtn = document.querySelector(".slide_next_button");
const slideItems = document.querySelectorAll(".slide_item");
const maxSlide = slideItems.length;
let currSlide = 1;
const pagination = document.querySelector(".slide_pagination");
const progress = document.querySelector('#progress_bar');
progress.setAttribute('style', `width:${(currSlide/maxSlide)*100}%`);
const radio_1 = document.querySelector("#social_label");
const radio_2 = document.querySelector("#club_label");

// 다음 버튼 이벤트
nextBtn.addEventListener("click", () => {
  currSlide++;
  if (currSlide <= maxSlide) {
    progress.setAttribute('style', `width:${(currSlide/maxSlide)*100}%`)
    const offset = slideWidth * (currSlide - 1);
    slideItems.forEach((i) => {
      i.setAttribute("style", `left: ${-offset}px`);
    });
  } else {
    currSlide--;
  }
});
// 이전 버튼 이벤트
prevBtn.addEventListener("click", () => {
  currSlide--;
  if (currSlide > 0) {
    progress.setAttribute('style', `width:${(currSlide/maxSlide)*100}%`)
    const offset = slideWidth * (currSlide - 1);
    slideItems.forEach((i) => {
      i.setAttribute("style", `left: ${-offset}px`);
    });
  } else {
    window.history.back() // 1페이지에서 이전을 눌렀을 경우 뒤로가기
  }
});
// 창 크기 리사이징
window.addEventListener("resize", () => {
  slideWidth = slide.clientWidth;
});
// 소셜링, 클럽 소셜링 선택
radio_1.addEventListener("click", () => {
  radio_1.classList.add('active')
  radio_2.classList.remove('active')
});
radio_2.addEventListener("click", () => {
  radio_2.classList.add('active')
  radio_1.classList.remove('active')
});
// 태그 이벤트 _ 다른 카테고리 선택시 현재 선택된 태그 해제
const tags = document.querySelectorAll('div.accordion-body > .tag-btn');
let tag_input = document.querySelector('#tag')
console.log(tag_input)
var n_tag = null;
[].forEach.call(tags, function(tag){
	tag.addEventListener("click", () => {
    for (let j=0; j<(tags.length); j++){
      tags[j].classList.remove('tag-btn-active')
    }
  tag.classList.add('tag-btn-active')
  n_tag = tag;
  tag_input.value = tag.value
  }); 
}); 
// 카테고리 이벤트 _ 카테고리 선택
const categories = document.querySelectorAll('.categories');
[].forEach.call(categories, function(category){ 
	category.addEventListener("click", () => {
    for (let j=0; j<(categories.length); j++){
      categories[j].classList.remove('active')
    }
    category.classList.add('active')
    n_tag.classList.remove('tag-btn-active')
    tag_input.value = ''
  });
});

function changeinner(event) {
  n_tag.innerText = event.parentNode.parentNode.querySelector('#tag').value
}

// Date/ Time picker

// 온라인, 오프라인 버튼 active
const offlinebtn = document.querySelector('#offline-btn');
const onlinebtn = document.querySelector('#online-btn');
const addrcheck = document.querySelector('#address_type');
const addrbox = document.querySelector('#offline-box');
const limit_addr = document.querySelector('#limit_addr');

offlinebtn.addEventListener('click', () => {
  offlinebtn.classList.toggle('addr-btn-active');
  onlinebtn.classList.remove('addr-btn-active');
  addrbox.classList.toggle('d-none');
  addrcheck.checked = false
  limit_addr.innerText = '오프라인'
});
onlinebtn.addEventListener('click', () => {
  onlinebtn.classList.toggle('addr-btn-active');
  offlinebtn.classList.remove('addr-btn-active');
  addrbox.classList.add('d-none');
  addrcheck.checked = true
  limit_addr.innerText = '온라인'
});

// 키워드로 검색하기
const keysearch = document.querySelector('#keysearch')
const addrdiv = document.querySelector('#addrlist')
const offbuttonaddr = document.querySelector('#offbuttonaddr')
const address = document.querySelector('#address')
var places = new kakao.maps.services.Places();

var callback = function(result, status) {
    if (status === kakao.maps.services.Status.OK) {
      arr = []
      for (var i = 0; i < (result.length); i++) {
        arr += `<li class="m-3 addrelem" data-bs-dismiss="offcanvas" aria-label="Close"><p class="addr_title">${result[i].place_name}</p><p class="addr_addr">${result[i].address_name}</p></li><hr>`
      };
      addrdiv.innerHTML = arr
      const addrelems = document.querySelectorAll('.addrelem');
      [].forEach.call(addrelems, function(elem) {
        elem.addEventListener('click', () => {
          offbuttonaddr.innerText = elem.firstChild.innerText
          address.value = elem.firstChild.innerText
        })
      })
    }
};
keysearch.addEventListener('keyup', () => {
  places.keywordSearch(`${keysearch.value}`, callback);
})

// 제한인원 설정하기
let limit = 3
const limit_minus = document.querySelector('#remove-circle');
const limit_plus = document.querySelector('#add-circle');
const limit_n = document.querySelector('#limit_n')
const limit_input = document.querySelector('#limit')
limit_minus.addEventListener('click', () => {
  if (limit > 3) {
    limit--
    limit_n.innerText = limit
    limit_input.value = limit
  } else {
    alert('최소 인원은 3명 입니다.')
  }
});
limit_plus.addEventListener('click', () => {
  if (limit < 15) {
    limit++
    limit_n.innerText = limit
    limit_input.value = limit
  } else {
    alert('최대 인원은 15명 입니다.')
  }
});

// 참가비 설정하기
const entry_fee = document.querySelector('#entryfee-btn');
const free_fee = document.querySelector('#entryfree-btn');
const fee_box = document.querySelector('#entry_box');
const fee_input = document.querySelector('#entry_fee')

entry_fee.addEventListener('click', () => {
  entry_fee.classList.toggle('addr-btn-active');
  free_fee.classList.remove('addr-btn-active');
  fee_box.classList.toggle('d-none');
});
free_fee.addEventListener('click', () => {
  free_fee.classList.toggle('addr-btn-active');
  entry_fee.classList.remove('addr-btn-active');
  fee_box.classList.add('d-none');
  fee_input.value = ''
});