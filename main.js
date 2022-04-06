const buttonComplexity = document.querySelectorAll('.btn_menu');
const scenePlaying = document.querySelector('.scene_playing');
const time = document.querySelector('.time');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;
let interval;

const openCardArr = [];

const createCard = (id) => { // создание карточек
  const scene = document.createElement('div');
  const card = document.createElement('div');
  const frontCard = document.createElement('div');
  const backCard = document.createElement('div');

  scene.classList.add('scene');
  card.classList.add('card');
  card.setAttribute('data-id', id);
  frontCard.classList.add('card__face', 'card__face--front');
  backCard.classList.add('card__face', 'card__face--back');
  backCard.textContent = id;

  card.append(frontCard);
  card.append(backCard);
  scene.append(card);
  scenePlaying.append(scene);

  return {
    scene,
    card,
    frontCard,
    backCard,
  };
};

const cardId = (numberOfcard, arr) => { // создание data-id
  for (let j = 0; j < numberOfcard / 2; j++) {
    arr.push(j);
    arr.push(j);
  }
};

const scenePlayingClear = () => {
  scenePlaying.innerHTML = '';
};

const shuffleCards = (array) => { // Перемешивание карточек
  let i = 0;
  let j = 0;
  let temp = null;
  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

function flipCard() { // переворачивание карт
  if (lockBoard) return;

  if (this === firstCard) { // защита от двойного клика
    return;
  }

  this.classList.add('is-flipped');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    hasFlippedCard = false;
    secondCard = this;
    cardComparisom();
  }
}

const resetBoard = () => { // сброс карты
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
};

const cardComparisom = () => { // сравнение карт
  if (firstCard.dataset.id === secondCard.dataset.id) {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    openCardArr.push(firstCard, secondCard);
    console.log(openCardArr);
    victory();
  } else {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove('is-flipped');
      secondCard.classList.remove('is-flipped');
      resetBoard();
    }, 1000);
  }
};

const timer = () => { // таймер
  buttonComplexity.forEach((btn) => {
    btn.addEventListener('click', () => {
      clearInterval(interval);
      time.innerHTML = 60;
    });
  });

  interval = setInterval(() => {
    time.innerHTML--;
    gameOver(interval);
  }, 1000);
};

const gameOver = () => { // условия проигрыша
  if (time.innerHTML < 0) {
    time.innerHTML = 0;
    const result = confirm('Вы проиграли.');
    if (result) {
      time.innerHTML = 60;
      scenePlayingClear();
    } else {
      time.innerHTML = 60;
      scenePlayingClear();
    }
    clearInterval(interval);
  }
};

const victory = () => { // условия победы
  const cards = document.querySelectorAll('.card');
  setTimeout(() => {
    if (cards.length === openCardArr.length) {
      alert('Поздравляем! Вы победили!');
      scenePlayingClear();
      time.innerHTML = 60;
      clearInterval(interval);
    }
  }, 1000);
};

const PlayingSize = () => { // определение размера поля и присваивание data-id
  buttonComplexity.forEach((btn) => {
    btn.addEventListener('click', () => {
      let arr = [];
      let numberOfcard;
      if (btn.id === '1') {
        numberOfcard = 4;
        scenePlayingClear();
        timer(interval);
        cardId(numberOfcard, arr);

        arr = shuffleCards(arr);
        arr.forEach((id) => createCard(id));
      }
      if (btn.id === '2') {
        numberOfcard = 8;
        scenePlayingClear();
        timer(interval);
        cardId(numberOfcard, arr);

        arr = shuffleCards(arr);
        arr.forEach((id) => createCard(id));
      }
      if (btn.id === '3') {
        numberOfcard = 12;
        scenePlayingClear();
        timer(interval);
        cardId(numberOfcard, arr);

        arr = shuffleCards(arr);
        arr.forEach((id) => createCard(id));
      }
      if (btn.id === '4') {
        numberOfcard = 16;
        scenePlayingClear();
        timer(interval);
        cardId(numberOfcard, arr);

        arr = shuffleCards(arr);
        arr.forEach((id) => createCard(id));
      }

      const cards = document.querySelectorAll('.card');
      cards.forEach((card) => {
        card.addEventListener('click', flipCard);
      });
    });
  });
};
PlayingSize();
