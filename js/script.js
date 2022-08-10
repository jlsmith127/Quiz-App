const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const rules = document.getElementById("rules");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
   currentQuestionIndex++;
   setNextQuestion(); 
});

function startGame() {
    rules.classList.add('hide')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = "Restart"
        startButton.style.backgroundColor = "orange"
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
const questions = [
    {
        question: "Anne of Green Gables",
        answers: [
            {text: 'Marilla Cuthbert', correct: false },
            {text: 'Jane Austen', correct: false },
            {text: 'L. M. Montgomery', correct: true },
            {text: 'Edith Nesbit', correct: false }
        ] 
    },
    {
        question: "The Hound of the Baskervilles",
        answers: [
            {text: "Dr. John Watson", correct: false },
            {text: "Sir Arthur Conan Doyle", correct: true},
            {text: "Edgar Rice Burroughs", correct: false},
            {text: "Agatha Christie", correct: false}
        ]
    },
    {
        question: "Paradise Lost",
        answers: [
            {text: "John Milton", correct: true },
            {text: "John Bunyan", correct: false },
            {text: "Jonathan Edwards", correct: false },
            {text: "Cotton Mather", correct: false }
        ]
    },
    {
        question: "Their Eyes Were Watching God",
        answers: [
            {text: "Langston Hughes", correct: false },
            {text: "Toni Morrison", correct: false },
            {text: "Alice Walker", correct: false },
            {text: "Zora Neale Hurston", correct: true }
        ]
    },
    {
        question: "Little Women",
        answers: [
            {text: "Louisa May Alcott", correct: true },
            {text: "Nathaniel Hawthorne", correct: false },
            {text: "Samuel Richardson", correct: false },
            {text: "Charles Dickens", correct: false }
        ]
    }
]