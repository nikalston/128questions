import questions from './questions.js';

document.addEventListener('DOMContentLoaded', () => {
    const flashcard = document.getElementById('test-flashcard');
    const questionDiv = flashcard.querySelector('.question');
    const answerDiv = flashcard.querySelector('.answer');
    const startButton = document.getElementById('start-test');
    const showAnswerButton = document.getElementById('show-answer');
    const testButtons = document.getElementById('test-buttons');
    const correctBtn = document.getElementById('correct-btn');
    const incorrectBtn = document.getElementById('incorrect-btn');
    const correctCountEl = document.getElementById('correct-count');
    const incorrectCountEl = document.getElementById('incorrect-count');
    const questionProgressEl = document.getElementById('question-progress');
    const testCompleteEl = document.getElementById('test-complete');
    const finalScoreEl = document.getElementById('final-score');
    const restartButton = document.getElementById('restart-test');

    const TOTAL_QUESTIONS = 20;
    let testQuestions = [];
    let currentQuestionIndex = 0;
    let correctCount = 0;
    let incorrectCount = 0;

    // Shuffle array using Fisher-Yates algorithm
    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Select 20 random questions
    function selectTestQuestions() {
        const allQuestions = questions.questions;
        const shuffled = shuffleArray(allQuestions);
        return shuffled.slice(0, TOTAL_QUESTIONS);
    }

    // Update the score display
    function updateScoreDisplay() {
        correctCountEl.textContent = correctCount;
        incorrectCountEl.textContent = incorrectCount;
        questionProgressEl.textContent = (currentQuestionIndex + 1) + ' / ' + TOTAL_QUESTIONS;
    }

    // Show the current question
    function showQuestion() {
        const currentQuestion = testQuestions[currentQuestionIndex];
        answerDiv.classList.add('hidden');
        questionDiv.textContent = currentQuestion.question;

        let answersHtml = '';
        if (currentQuestion.answers.length > 1) {
            answersHtml = '<ul>' + currentQuestion.answers.map(function(answer) {
                return '<li>' + answer + '</li>';
            }).join('') + '</ul>';
        } else {
            answersHtml = currentQuestion.answers.join(', ');
        }
        answerDiv.innerHTML = answersHtml;

        showAnswerButton.classList.remove('hidden');
        testButtons.classList.add('hidden');
        updateScoreDisplay();
    }

    // Show the answer
    function showAnswer() {
        answerDiv.classList.remove('hidden');
        showAnswerButton.classList.add('hidden');
        testButtons.classList.remove('hidden');
    }

    // Record answer and move to next question
    function recordCorrect() {
        correctCount++;
        nextQuestion();
    }

    function recordIncorrect() {
        incorrectCount++;
        nextQuestion();
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex >= TOTAL_QUESTIONS) {
            endTest();
        } else {
            showQuestion();
        }
    }

    // Start the test
    function startTest() {
        testQuestions = selectTestQuestions();
        currentQuestionIndex = 0;
        correctCount = 0;
        incorrectCount = 0;

        startButton.classList.add('hidden');
        testCompleteEl.classList.add('hidden');
        showQuestion();
    }

    // End the test
    function endTest() {
        flashcard.classList.add('hidden');
        showAnswerButton.classList.add('hidden');
        testButtons.classList.add('hidden');
        testCompleteEl.classList.remove('hidden');

        const percentage = Math.round((correctCount / TOTAL_QUESTIONS) * 100);
        finalScoreEl.innerHTML = 'You got <strong>' + correctCount + '</strong> out of <strong>' + TOTAL_QUESTIONS + '</strong> correct (' + percentage + '%)';

        updateScoreDisplay();
    }

    // Event listeners
    startButton.addEventListener('click', startTest);
    showAnswerButton.addEventListener('click', showAnswer);
    correctBtn.addEventListener('click', recordCorrect);
    incorrectBtn.addEventListener('click', recordIncorrect);
    restartButton.addEventListener('click', startTest);

    // Allow clicking flashcard to show answer
    flashcard.addEventListener('click', function() {
        if (!answerDiv.classList.contains('hidden')) {
            return;
        }
        if (!showAnswerButton.classList.contains('hidden')) {
            showAnswer();
        }
    });
});
