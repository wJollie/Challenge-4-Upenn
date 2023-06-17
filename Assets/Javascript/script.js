// Array of questions and answers
// Questions from https://www.w3docs.com/quiz/javascript-basic
const quizQuestions = [
  {
    question: "Which is the correct way to write a comment in JavaScript?",
    choices: ["{#...#}", "<!---...---!>", "//...", "\\..."],
    correctAnswer: 2,
  },
  {
    question: "How do you get the DOM element with id in JavaScript?",
    choices: [
      "window.getElementById(...)",
      "document.getElementById(...)",
      "page.getElementById(...)",
      "document.innerHTML.getElementById(...)",
    ],
    correctAnswer: 1,
  },
  {
    question: "How do you create a new function in JavaScript?",
    choices: [
      "new.function() {}",
      "function:myFunction() {}",
      "function = myFunction() {}",
      "function myFunction() {}",
    ],
    correctAnswer: 3,
  },
  {
    question: "Which of the following does the pop() method do?",
    choices: [
      "It increments the total length by 1",
      "It decrements the total length by 1",
      "It prints the first element but no effect on the length",
      "None of the above",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "Which of the following is used for assigning a value to a variable?",
    choices: ["*", "=", "-", "x"],
    correctAnswer: 1,
  },
  {
    question: "Inside which element do you put Javascript?",
    choices: ["<var>", "<script>", "<section>", "<code>"],
    correctAnswer: 1,
  },
  {
    question: "How do you open a new window with JavaScript?",
    choices: [
      "window.open(...)",
      "window.new(...)",
      "open(new window())",
      "window.open_new(...)",
    ],
    correctAnswer: 0,
  },
];

// Declaring variables I'm gonna need
let currentQuestionIndex = 0;
let score = 0;
let remainingTime = 0;
let saved = 0;

// Referencing all elements I'm gonna need
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
const retryButton = document.getElementById("retryButton");

// Hide elements on website load
endWrapper.style.display = "none";
timerWrapper.style.display = "none";
checker.style.display = "none";
answerChecked.style.display = "none";
retryButton.style.display = "none";

// Event listener for start button
startButton.addEventListener("click", startQuiz);
// Event listener for choices
choicesWrapper.addEventListener("click", answerChoice);
// Event listener for submit button
submitButton.addEventListener("click", saveInitials);
// Event listener for retry quiz
retryButton.addEventListener("click", startQuiz);

startButton.style.visibility = "visible";

// Start quiz function
function startQuiz() {
  // Reset variables
  currentQuestionIndex = 0;
  score = 0;
  saved = 0;
  quizWrapper.style.background = "white";
  initialsInput.value = "";

  // Hide start button once clicked
  checker.textContent = "";
  checker.style.background = "white";
  startButton.style.visibility = "hidden";
  quizWrapper.style.display = "block";
  endWrapper.style.display = "none";
  timerWrapper.style.display = "block";
  checker.style.display = "block";
  answerChecked.style.display = "block";

  startTimer();
  displayQuestion();
}

// Timer interval
let timerInterval;

// Timer function
function startTimer() {
  // Timer set for 120
  const duration = 120;
  remainingTime = duration;
  displayTime();
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    // Time ticks down
    remainingTime--;
    displayTime();

    // If time hits 0, timer clears and quiz ends
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1200);
}

// Function to display the time on the timer
function displayTime() {
  // Referencing timer element
  const timerElement = document.getElementById("timer");
  const seconds = remainingTime;

  // Displaying time left
  timerElement.textContent = seconds;
}

// Getting question function
function displayQuestion() {
  // Referencing questions and choices
  const questionElement = document.getElementById("question");

  // Getting the current question from the question array
  const currentQuestion = quizQuestions[currentQuestionIndex];

  // Update the question element
  questionElement.textContent = currentQuestion.question;

  // Reset the wrapper
  choicesWrapper.innerHTML = "";

  // Create and append answer choices
  currentQuestion.choices.forEach((choice, index) => {
    const choiceElement = document.createElement("li");
    choiceElement.classList.add("choices");
    choiceElement.textContent = choice;
    choicesWrapper.appendChild(choiceElement);
  });
}

/// End quiz function
function endQuiz() {
  retryButton.style.display = "block";
  quizWrapper.style.display = "none";
  endWrapper.style.display = "block";
  timerWrapper.style.display = "none";
  checker.style.display = "none";
  answerChecked.style.display = "none";
}

// Answer choice function
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
      // Update score as it goes up
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

// Save initials function
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
  return scoreText === "" ? 0 : parseInt(scoreText);
}
