{ 
  const handleHamClick = () => {
    $hamMenu.classList.toggle('active');
    $offScreenMenu.classList.toggle('active');
  }

  const $hamMenu = document.querySelector('.ham-menu');

  const $offScreenMenu = document.querySelector('.off-screen-menu');

  $hamMenu.addEventListener('click', handleHamClick);

  //DONT FORGET TO FIX THE LETTERS!!!
  //DONT FORGET TO FIX THE LETTERS!!!
  //DONT FORGET TO FIX THE LETTERS!!!

  const $letters = document.querySelectorAll('.chapter-two__letter');
  const $dropBoxes = document.querySelectorAll('.chapter-two__drop-box');
  const motto = ['L', 'A', 'B', 'O', 'R', 'E', 'E', 'T', 'C', 'O', 'N', 'S', 'T', 'A', 'N', 'T', 'I', 'A'];

  let currentOrder = Array($dropBoxes.length).fill(null);

  $letters.forEach(letter => {
    letter.addEventListener('dragstart', event => {
      event.dataTransfer.setData('text', event.target.dataset.letter);
    });
  });

  $dropBoxes.forEach((box, index) => {
    box.addEventListener('dragover', event => {
      event.preventDefault();
    });

    box.addEventListener('drop', event => {
      event.preventDefault();
      const letter = event.dataTransfer.getData('text');
      const draggedLetter = document.querySelector(`[data-letter="${letter}"]`);

      if (box.textContent === '' && draggedLetter) {
        box.textContent = letter;
        currentOrder[index] = letter;
        draggedLetter.classList.add('chapter-two__hidden');
        checkOrder();
      }
    });
  });

  const checkOrder = () => {
    if (currentOrder.join('') === motto.join('')) {
      document.querySelector('.chapter-two__story').classList.remove('chapter-two__hidden');
    }
  };

  const init = () => {
  };

  init();
}