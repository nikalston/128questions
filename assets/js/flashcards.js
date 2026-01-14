import questions from './questions.js';

document.addEventListener('DOMContentLoaded', () => {
    const flashcard = document.getElementById('flashcard');
    const questionDiv = flashcard.querySelector('.question');
    const answerDiv = flashcard.querySelector('.answer');
    const nextButton = document.getElementById('next-question');
    const newQuestionsCheckbox = document.getElementById('new-questions');

    let allQuestions = questions.questions;
    let currentQuestion = null;

    function filterQuestions() {
        if (newQuestionsCheckbox.checked) {
            allQuestions = questions.getNewQuestions();
        } else {
            allQuestions = questions.questions;
        }
    }

    function getRandomQuestion() {
        const randomIndex = Math.floor(Math.random() * allQuestions.length);
        return allQuestions[randomIndex];
    }

    function showQuestion() {
        currentQuestion = getRandomQuestion();
        answerDiv.classList.add('hidden');
        questionDiv.textContent = currentQuestion.question;
        let answersHtml = '';
        if (currentQuestion.answers.length > 1) {
            answersHtml = '<ul>' + currentQuestion.answers.map(answer => `<li>${answer}</li>`).join('') + '</ul>';
        } else {
            answersHtml = currentQuestion.answers.join(', ');
        }
        answerDiv.innerHTML = answersHtml;
    }

    flashcard.addEventListener('click', () => {
        answerDiv.classList.toggle('hidden');
    });

    nextButton.addEventListener('click', showQuestion);

    newQuestionsCheckbox.addEventListener('change', () => {
        filterQuestions();
        showQuestion();
    });

    filterQuestions();
    showQuestion();
});
