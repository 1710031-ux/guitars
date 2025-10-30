// 기타 데이터 예시
const guitars = [
  {
    brand: 'Martin',
    model: 'D-28',
  img: 'images/common.jpeg',
    desc: '전설적인 D-28 모델은 깊은 울림과 선명한 사운드로 유명합니다.',
    detail: 'martin.html'
  },
  {
    brand: 'Gibson',
    model: 'J-45',
  img: 'images/J-45.jpeg',
    desc: '따뜻한 톤과 부드러운 연주감으로 사랑받는 J-45.',
    detail: 'J-45.html'
  },
  {
    brand: 'Fender',
    model: 'Stratocaster',
  img: 'images/Stratocaster.jpeg',
    desc: '전설적인 일렉 기타, 다양한 장르에 어울림.',
    detail: 'Stratocaster.html'
  },
  {
    brand: 'Martin',
    model: 'OM-28',
  img: 'images/OM-28.jpeg',
    desc: '밸런스 좋은 사운드와 클래식한 디자인.',
    detail: 'OM-28.html'
  },
  {
    brand: 'Gibson',
    model: 'Les Paul',
  img: 'images/Les-paul.jpeg',
    desc: '록의 상징, 강렬한 사운드와 무게감.',
    detail: 'Les-paul.html'
  },
  {
    brand: 'Fender',
    model: 'Telecaster',
  img: 'images/Telecaster.jpeg',
    desc: '심플한 디자인, 명확한 사운드.',
    detail: 'Telecaster.html'
  }
];

const gallery = document.querySelector('.gallery');
const brandBtns = document.querySelectorAll('.brand-btn');
const searchInput = document.getElementById('search');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalModel = document.getElementById('modal-model');
const modalDesc = document.getElementById('modal-desc');
const modalDetail = document.getElementById('modal-detail');
const closeBtn = document.querySelector('.close-btn');

let currentBrand = 'All';
let currentSearch = '';

function renderGallery() {
  gallery.innerHTML = '';
  const filtered = guitars.filter(guitar => {
    const brandMatch = currentBrand === 'All' || guitar.brand === currentBrand;
    const searchMatch = guitar.model.toLowerCase().includes(currentSearch.toLowerCase());
    return brandMatch && searchMatch;
  });
  filtered.forEach(guitar => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${guitar.img}" alt="${guitar.model}">
      <div class="card-model">${guitar.model}</div>
      <button class="card-btn">자세히 보기</button>
    `;
    card.querySelector('.card-btn').addEventListener('click', () => openModal(guitar));
    card.addEventListener('click', (e) => {
      if (e.target.classList.contains('card-btn')) return;
      openModal(guitar);
    });
    gallery.appendChild(card);
  });
}

brandBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    brandBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentBrand = btn.dataset.brand;
    renderGallery();
  });
});

searchInput.addEventListener('input', (e) => {
  currentSearch = e.target.value;
  renderGallery();
});

function openModal(guitar) {
  modalImg.src = guitar.img;
  modalModel.textContent = guitar.model;
  modalDesc.textContent = guitar.desc;
  modalDetail.href = guitar.detail;
  modalDetail.textContent = '자세히 보기';
  modal.classList.remove('hidden');
}
closeBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.add('hidden');
});

// 첫 렌더링
renderGallery();