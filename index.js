const dataStore = [ 
    {
      question: 'Period of European history between ancient and modern times are called',
      choice1: 'Light Ages',
      choice2: 'Crazy Ages',
      choice3: 'Middle Ages',
      choice4: 'Dark Ages',
      correct: 'Middle Ages'
    },
    {
      question: 'The middle ages began after the collapse of what?',
      choice1: 'Old Buildings',
      choice2: 'A House Card',
      choice3: 'Roman Empire',
      choice4: 'Napoleon Bonaparte',
      correct: 'Roman Empire'
    },
    {
      question: 'The Roman Empire got too big so the split they Empire into two parts. what were the two groups called?',
      choice1: '“Western and Eastern Empires”',
      choice2: '“France and England”',
      choice3: '“Northern and Southern Empire”',
      choice4: 'Water and Land Empires',
      correct: '“Western and Eastern Empires”'
    },
    {
      question: 'What were foreigners called',
      choice1: 'Infidels',
      choice2: 'Barbarians',
      choice3: 'Traitors',
      choice4: 'Outsiders',
      correct: 'Barbarians'
    },
    {
      question: 'The Average lifespan during the middle ages was what',
      choice1: '35',
      choice2: '65',
      choice3: '100',
      choice4: '50',
      correct: '35'
    },
    {
      question: 'The Medieval Church was Roman Catholic and the churches power and wealth was equal to that of what',
      choice1: 'Peasants',
      choice2: 'Warriors',
      choice3: 'Kings and Emperors',
      choice4: 'Servants',
      correct: 'Kings and Emperors'
    },
    {
      question: 'Who gave up all his wealth to serve God',
      choice1: 'Don Quito',
      choice2: 'King Charles',
      choice3: 'Robin Hood',
      choice4: 'St. Francis',
      correct: 'St. Francis'
    },
    {
      question: 'From the formation of two different groups the oldest English language was established called what',
      choice1: 'French.',
      choice2: 'Old English',
      choice3: 'Spanish',
      choice4: 'Slang',
      correct: 'Old English'
    },
    {
      question: 'After William there were many Kings, and one of the most notable was who',
      choice1: 'Mark',
      choice2: 'Mary',
      choice3: 'Luke',
      choice4: 'Henry II',
      correct: 'Henry II'
    },
    {
      question: 'The Eastern Church was Orthodox and spoke Greek. The Western Church spoke Latin and was called what Religion',
      choice1: 'Lutheran',
      choice2: 'Catholic',
      choice3: 'Jewish',
      choice4: 'Poor',
      correct: 'Catholic'
    }
  ];

let questionN = 0;
let userScore = 0;
  function handleStart() {
    $('.question-container').on('click', '.start-quiz', event => {
      event.preventDefault();
      $('.ready-start').remove();
      updateUserScore();
      renderQuestions(questionN);
      $('.selection').addClass('not-selected');
      questionCount(questionN + 1);
    });
}
function changeSelectionColor() {
  $('.question-container').on('click', '.selection', event => {
    $('.selection').removeClass('not-selected');
    let currentSelection = $(event.currentTarget);
    let notSelected = $('.selection').not(currentSelection);
    notSelected.removeClass('user-selection-color');
    notSelected.addClass('not-selected');
    currentSelection.addClass('user-selection-color');
  });
}
function renderQuestions(num) {
  $('.question-container').append(`<form class="question-box" role="form">
    <fieldset class="main-field" for="questions">
        <legend class="question-header"><p class="question-display-number">Question ${num + 1}.</p> <p class="question-content">${dataStore[num].question}</p></legend>
        <label class="selection"><input type="radio" name="choice" id="questions" tabindex="0" value="${dataStore[num].choice1}"/><p id="js-choice-one">${dataStore[num].choice1}</p></label><br>
        <label class="selection"><input type="radio" name="choice" id="questions" tabindex="0" value="${dataStore[num].choice2}"/><p id="js-choice-two">${dataStore[num].choice2}</p></label><br>
        <label class="selection"><input type="radio" name="choice" id="questions" tabindex="0" value="${dataStore[num].choice3}"/><p id="js-choice-three">${dataStore[num].choice3}</p></label><br>
        <label class="selection"><input type="radio" name="choice" id="questions" tabindex="0" value="${dataStore[num].choice4}"/><p id="js-choice-four">${dataStore[num].choice4}</p></label><br>
      </fieldset>
      <button type="submit" class="submit-answer" role="button">Submit</button>
    </form>`);
}

function renderCorrectResults() {
  if(questionN === 9) {
    renderCorrectFinish();
    updateUserScore();
  }
  else {
    $('.question-container').append(`<section class="results-box correct" role="article">
    <p>Correct!</p>
    <p>Your current score: ${userScore}/10</p>
    </section>
    <section class="submit-buttons"><button type="submit" class="next-question" role="button">Next Question</button></section>`);
    updateUserScore();
  }
}

function renderWrongResults() {
  if (questionN === 9){
    renderWrongFinish();
  }
  else {
  $('.question-container').append(`<section class="results-box wrong" role="article">
  <p>Wrong!</p>
  <p>The correct answer is ${dataStore[questionN].correct}!</p>
  <p>Your score: ${userScore}/10</p>
  </section>
  <section class="submit-buttons"><button type="submit" class="next-question" role="button">Next Question</button></section>`);
  }
}

function handleSubmitClick() {
  $('.question-container').on('click', '.submit-answer', event =>{
    event.preventDefault();
    userSelection(questionN);
  });
}

function handleNextClick() {
  $('.question-container').on('click', '.next-question', event => {
    event.preventDefault();
    $('.results-box').remove();
    $('.submit-buttons').remove();
    questionCheck();
  });
}

function questionCount(num) {
 $('.question-count').text(`Question: ${num}/10`);
}

function userSelection(num) {
 
  let userChoice = $('input:radio[name="choice"]:checked').val();

  if (userChoice){
    answerCheck(userChoice, dataStore[num].correct);
  }
  else if(!userChoice) {
    alert('You must make a selection!');
  }
}

function updateUserScore() {
  $('.score-count').text(`Score: ${userScore}/10`);
}

function answerCheck(inputVal, correctVal) {
  if (inputVal === correctVal) {
    userScore = userScore + 1;
    $('.question-box').remove();
    renderCorrectResults();
    }
  else {
  $('.question-box').remove();
  renderWrongResults();
    }
}

function questionCheck() {
  if (questionN < 9){
    questionN++;
    renderQuestions(questionN);
    $('.selection').addClass('not-selected');
    questionCount(questionN + 1);
  }
  else if (questionN === 9){
    $('.final-button').remove();
    renderRestart();
  }
}

function renderRestart() {
  $('.question-container').append(`<section class="ready-start" role="article"><p>You finished the quiz! Your final score is ${userScore}/10.</p><p>Start quiz over?</p><button class="start-quiz" type="submit" role="button">Start over</button></section>`);
  questionN = 0;
  userScore = 0;
}

function renderWrongFinish() { 
  $('.question-container').append(`<section class="results-box wrong" role="article">
  <p>Wrong!</p>
  <p>The correct answer was ${dataStore[questionN].correct}!</p>
  <p>Your score is ${userScore}/${questionN + 1}.</p>
  </section>
  <button type="submit" class="next-question final-button" role="button">Finish Quiz</button>`);
}

function renderCorrectFinish() {
  $('.question-container').append(`<section class="results-box correct" role="article"><p>Correct!</p>
  <p>Your score is ${userScore}/${questionN + 1}</p>
  </section>
  <button type="submit" class="next-question final-button" role="button">Finish Quiz</button>`);
}

function handleEverything() {
$(handleSubmitClick);
$(handleStart);
$(handleNextClick);
$(changeSelectionColor);
}

$(handleEverything);