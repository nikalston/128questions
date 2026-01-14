import questions from './questions.js';

document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('category');
    const subcategorySelect = document.getElementById('subcategory');
    const questionsList = document.getElementById('questions');

    // Populate category options
    const categories = questions.getCategories();
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });

    // Function to populate subcategory options based on selected category
    function populateSubcategories(category) {
        subcategorySelect.innerHTML = '<option value="">All Subcategories</option>'; // Reset subcategories
        if (category) {
            const subcategories = questions.getSubcategories(category);
            subcategories.forEach(subcategory => {
                const option = document.createElement('option');
                option.value = subcategory;
                option.textContent = subcategory;
                subcategorySelect.appendChild(option);
            });
        }
    }

    // Function to display questions based on selected category and subcategory
    function displayQuestions(category, subcategory) {
        questionsList.innerHTML = ''; // Clear existing questions
        let filteredQuestions = questions.questions;

        if (category) {
            filteredQuestions = filteredQuestions.filter(q => q.category === category);
        }

        if (subcategory) {
            filteredQuestions = filteredQuestions.filter(q => q.subcategory === subcategory);
        }

        filteredQuestions.forEach(question => {
            const li = document.createElement('li');
            let answersHtml = '';
            if (question.answers.length > 1) {
                answersHtml = '<ul>' + question.answers.map(answer => `<li>${answer}</li>`).join('') + '</ul>';
            } else {
                answersHtml = question.answers.join(', ');
            }
            li.innerHTML = `<strong>${question.id}. ${question.question}</strong><br>${answersHtml}`;
            questionsList.appendChild(li);
        });
    }

    // Event listeners for category and subcategory changes
    categorySelect.addEventListener('change', (event) => {
        const selectedCategory = event.target.value;
        populateSubcategories(selectedCategory);
        displayQuestions(selectedCategory, subcategorySelect.value);
    });

    subcategorySelect.addEventListener('change', (event) => {
        const selectedSubcategory = event.target.value;
        displayQuestions(categorySelect.value, selectedSubcategory);
    });

    // Initial display of all questions
    displayQuestions();
});
