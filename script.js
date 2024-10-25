let currentExercise = 0;
let score = 0;
let timeLeft = 30;
let timer;
let currentGame;

const operations = {
    easy: ['+', '+'],
    medium: ['+', '-', '*'],
    hard: ['+', '-', '*', '/'],
    extreme: ['+', '-', '*', '/']
};

const maxNumbers = {
    easy: 10,
    medium: 20,
    hard: 50,
    extreme: 100
};

const exercises = {
    easy: generateQuestions('easy'),
    medium: generateQuestions('medium'),
    hard: generateQuestions('hard'),
    extreme: generateQuestions('extreme'),
};

function generateQuestions(difficulty) {
    const questions = [];
    
    for (let i = 0; i < 20; i++) {
        const operation = operations[difficulty][Math.floor(Math.random() * operations[difficulty].length)];
        const num1 = Math.floor(Math.random() * maxNumbers[difficulty]) + 1; // Random number between 1 and max
        const num2 = Math.floor(Math.random() * maxNumbers[difficulty]) + 1; // Random number between 1 and max

        let question, correctAnswer;

        switch (operation) {
            case '+':
                question = `${num1} + ${num2} = ?`;
                correctAnswer = num1 + num2;
                break;
            case '-':
                question = `${num1} - ${num2} = ?`;
                correctAnswer = num1 - num2;
                break;
            case '*':
                question = `${num1} * ${num2} = ?`;
                correctAnswer = num1 * num2;
                break;
            case '/':
                question = `${num1 * num2} / ${num2} = ?`; // Ensure no decimals for division
                correctAnswer = num1;
                break;
        }

        let options = [correctAnswer];

        // Add additional wrong options
        while (options.length < 3) {
            const wrongAnswer = Math.floor(Math.random() * (correctAnswer + 10)); // Random answer around the correct one
            if (!options.includes(wrongAnswer)) {
                options.push(wrongAnswer);
            }
        }

        // Shuffle the options
        options.sort(() => Math.random() - 0.5);

        questions.push({
            question: question,
            correctAnswer: correctAnswer,
            options: options,
        });
    }
    return questions;
}

function startGame(mode) {
    currentGame = mode;
    currentExercise = 0;
    score = 0;
    timeLeft = 30;
    document.getElementById('score-value').innerText = score;
    document.getElementById('time-left').innerText = timeLeft;
    document.getElementById('training-area').classList.remove('hidden');
    document.getElementById('level-title').innerText = mode.charAt(0).toUpperCase() + mode.slice(1) + " Mode";
    loadExercise(mode);
    startTimer();
}

function loadExercise(mode) {
    if (currentExercise < exercises[mode].length) {
        const exercise = exercises[mode][currentExercise];
        document.getElementById('exercise').innerText = exercise.question;

        const [optionA, optionB, optionC] = exercise.options;
        document.querySelectorAll('.mcq-option')[0].innerText = `A: ${optionA}`;
        document.querySelectorAll('.mcq-option')[1].innerText = `B: ${optionB}`;
        document.querySelectorAll('.mcq-option')[2].innerText = `C: ${optionC}`;

        document.getElementById('mcq-options').classList.remove('hidden');
        document.getElementById('feedback').classList.add('hidden');
    } else {
        endGame();
    }
}

function selectOption(option) {
    const selectedAnswer = document.querySelector(`.mcq-option:nth-child(${option === 'A' ? 1 : option === 'B' ? 2 : 3})`).innerText.split(': ')[1];
    const correctAnswer = exercises[currentGame][currentExercise].correctAnswer;

    if (parseInt(selectedAnswer) === correctAnswer) {
        score++;
        document.getElementById('feedback').innerText = 'Correct!';
    } else {
        document.getElementById('feedback').innerText = `Wrong! Correct answer is ${correctAnswer}.`;
    }

    document.getElementById('feedback').classList.remove('hidden');
    document.getElementById('score-value').innerText = score;
    currentExercise++;
    loadExercise(currentGame);
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time-left').innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function endGame() {
    document.getElementById('training-area').classList.add('hidden');
    alert(`Time's up! Your final score is: ${score}`);
    resetGame();
}

function resetGame() {
    document.getElementById('level-title').innerText = '';
    document.getElementById('score-value').innerText = '0';
    document.getElementById('time-left').innerText = '30';
    document.getElementById('feedback').classList.add('hidden');
    currentExercise = 0;
    score = 0;
    timeLeft = 30;
}

