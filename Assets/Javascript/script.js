// Array of questions and answers
const quizQuestions = [
  {
    question: "What color is the sky?",
    choices: ["Green", "Blue", "Purple", "Rainbow"],
    correctAnswer: 1,
  },
  {
    question: "What color is grass?",
    choices: ["Orange", "Green", "Blue", "Purple"],
    correctAnswer: 1,
  },
  {
    question: "What sound does a dog make?",
    choices: ["Meow", "Moo", "Roar", "Bark"],
    correctAnswer: 3,
  },
  {
    question: "placeHolderQuestion4",
    choices: [
      "placeHolderAnswer1",
      "placeHolderAnswer2",
      "placeHolderAnswer3",
      "placeHolderAnswer4",
    ],
    correctAnswer: 0,
  },
  {
    question: "placeHolderQuestion5",
    choices: [
      "placeHolderAnswer1",
      "placeHolderAnswer2",
      "placeHolderAnswer3",
      "placeHolderAnswer4",
    ],
    correctAnswer: 2,
  },
  {
    question: "placeHolderQuestion6",
    choices: [
      "placeHolderAnswer1",
      "placeHolderAnswer2",
      "placeHolderAnswer3",
      "placeHolderAnswer4",
    ],
    correctAnswer: 3,
  },
  {
    question: "placeHolderQuestion7",
    choices: [
      "placeHolderAnswer1",
      "placeHolderAnswer2",
      "placeHolderAnswer3",
      "placeHolderAnswer4",
    ],
    correctAnswer: 1,
  },
];
let currentQuestionIndex = 0;
let score = 0;
let remainingTime = 0;
let saved = 0;
// Referencing start button and question choices
const startButton = document.getElementById("start");
const choicesWrapper = document.getElementById("choices");
const quizWrapper = document.getElementById("quizWrapper");
const endWrapper = document.getElementById("endWrapper");
const question = document.getElementById("question");
const scoreWrapper = document.getElementById("scoreWrapper");
const individualScore = document.getElementById("individualScore");
const timerWrapper = document.getElementById("timerWrapper");
const submitButton = document.getElementById("submitButton");
const initialsInput = document.getElementById("initials");
const highScoreList = document.getElementById("highScoreList");
const checker = document.getElementById("checker");
const answerChecked = document.getElementById("answerChecked");

// hidden on website load
endWrapper.style.visibility = "hidden";
timerWrapper.style.visibility = "hidden";
checker.style.visibility = "hidden";
answerChecked.style.visibility = "hidden";

// event listener for start button
startButton.addEventListener("click", startQuiz);
// event listener for choices
choicesWrapper.addEventListener("click", answerChoice);

// start quiz function
function startQuiz() {
  //   Resets variables
  currentQuestionIndex = 0;
  score = 0;
  saved = 0;
  quizWrapper.style.background = "white";
  // takes away start button once clicked
  startButton.style.visibility = "hidden";
  quizWrapper.style.visibility = "visible";
  endWrapper.style.visibility = "hidden";
  timerWrapper.style.visibility = "visible";
  checker.style.visibility = "visible";
  answerChecked.style.visibility = "visible";
  startTimer();
  displayQuestion();
}
// timer interval
let timerInterval;
// timer function
function startTimer() {
  // timer set for 120
  const duration = 120;
  remainingTime = duration;
  displayTime();
  clearInterval(timerInterval);
  timerInterval = setInterval(function () {
    // time ticks down
    remainingTime--;
    displayTime();
    // if time hits 0 timer clears quiz ends
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1200);
}

// Function to display the time on the timer
function displayTime() {
  // referencing timer element
  const timerElement = document.getElementById("timer");
  const seconds = remainingTime;
  // Displaying time left
  timerElement.textContent = seconds;
}

// getting question function
function displayQuestion() {
  // referencing questions and choices
  const questionElement = document.getElementById("question");
  // getting the current question from the question array
  const currentQuestion = quizQuestions[currentQuestionIndex];
  //   updating the question element
  questionElement.textContent = currentQuestion.question;
  //   reset the wrapper
  choicesWrapper.innerHTML = "";
  // create and edit answer choices
  currentQuestion.choices.forEach(function (choice, index) {
    const choiceElement = document.createElement("li");
    choiceElement.classList.add("choices");
    choiceElement.textContent = choice;
    choicesWrapper.appendChild(choiceElement);
  });
}
// end quiz function
function endQuiz() {
  startButton.style.visibility = "visible";
  startButton.textContent = "Retry Quiz";
  quizWrapper.style.visibility = "hidden";
  endWrapper.style.visibility = "visible";
  timerWrapper.style.visibility = "hidden";
  checker.style.visibility = "hidden";
  answerChecked.style.visibility = "hidden";
}

// answer choice function
function answerChoice(event) {
  const selectedChoice = event.target;
  if (selectedChoice.classList.contains("choices")) {
    const selectedChoiceIndex = Array.from(choicesWrapper.children).indexOf(
      selectedChoice
    );
    const currentQuestion = quizQuestions[currentQuestionIndex];

    if (selectedChoiceIndex === currentQuestion.correctAnswer) {
      // If the selected choice is correct
      score++;
      checker.textContent = "Correct";
      checker.style.background = "green";
      // updates score as it goes up
      individualScore.textContent = score;
    } else {
      checker.style.background = "red";
      checker.textContent = "Incorrect";
      remainingTime -= 10;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      displayQuestion();
    } else {
      // If all questions have been answered, end the quiz
      endQuiz();
    }
  }
}
// event listener for submit button
submitButton.addEventListener("click", saveInitials);
// initials Function
function saveInitials() {
  if (saved === 0) {
    const initials = initialsInput.value;
    const leader = { initials: initials, score: score };
    const highScoreItems = Array.from(highScoreList.children);

    // Add the new leader to the array of high score items
    highScoreItems.push(createHighScoreItem(leader));

    // Sort the high score items in descending order based on the score
    highScoreItems.sort((a, b) => getScore(b) - getScore(a));

    // Remove all existing items from the high score list
    while (highScoreList.firstChild) {
      highScoreList.removeChild(highScoreList.firstChild);
    }

    // Append the sorted high score items back to the high score list
    highScoreItems.forEach((item) => {
      highScoreList.appendChild(item);
    });

    saved++;
  }
}

// Helper function to create a new high score item
function createHighScoreItem(leader) {
  const liElement = document.createElement("li");
  liElement.textContent = leader.initials + ": " + leader.score;
  return liElement;
}

// Helper function to get the score from a high score item
function getScore(item) {
  const scoreText = item.textContent.split(":")[1].trim();
  return parseInt(scoreText);
}
