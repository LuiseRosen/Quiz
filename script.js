let questions = [
    {
        "question": "Wem gelang es, den Stein der Weisen zu stehlen?",
        "answer_1": "Professor Quirrel",
        "answer_2": "Lord Voldemort",
        "answer_3": "Harry Potter",
        "answer_4": "Peter Petigrew",
        "right_answer": 3
    },
    {
        "question": "Wer hat den letzten Horkrux erledigt?",
        "answer_1": "Neville Longbottom",
        "answer_2": "Lord Voldemort",
        "answer_3": "Harry Potter",
        "answer_4": "Molly Weasley",
        "right_answer": 1
    },
    {
        "question": "Wie lautet Hermine Grangers Zweitname?",
        "answer_1": "Jane",
        "answer_2": "Jean",
        "answer_3": "Joanne",
        "answer_4": "Johanna",
        "right_answer": 2
    },
    {
        "question": "Durch welche 3 Dinge erlangt Lord Voldemort seinen Körper zurück?",
        "answer_1": "Gold, Weihrauch und Myrrhe",
        "answer_2": "Fleisch, Blut und Knochen",
        "answer_3": "Elderstab, Tarnumhang, Stein der Auferstehung ",
        "answer_4": "Glaube, Liebe, Hoffnung",
        "right_answer": 2
    }
];

let current_question = 0;
let rightAnswers = 0;

let audio_success = new Audio('./audio/success.mp3');
let audio_fail = new Audio('./audio/fail.mp3');
let audio_click = new Audio('./audio/click.mp3')

function init() {
    document.getElementById('total-questions').innerHTML = questions.length; // Zeigt an, wieviele Fragen insgesamt da sind
    showQuestion(); // fügt Frage und Antwortmöglichkeiten aus dem Array ein
}

function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateProgressBar();
        updateToNextQuestion();
    }
}

function gameIsOver() {
    return current_question >= questions.length;
}


function answer(selectedAnswer) {
    let question = questions[current_question]; // wir holen uns den Block an Infos aus dem Array an der Stelle current_question (ist oben als 0 definiert)
    let selectedAnswerNumber = selectedAnswer.slice(-1); // damit holen wir uns den letzten buchstaben aus dem String in der Variablen selectedAnswer
    let idOfRightAnswer = `answer_${question['right_answer']}`; // bastelt die id der richtigen Antwort, die wir dann grün markieren wollen

    if (rightAnswerSelected(selectedAnswerNumber, question)) {
        document.getElementById(selectedAnswer).parentNode.classList.add('bg-success'); // grünen Hintergrund anzeigen, parentNode wählt das übergeordnete Element an
        audio_success.play(); // success sound abspielen
        rightAnswers++;
    } else { // wenn die Frage falsch beantwortet wurde, soll das passieren
        document.getElementById(selectedAnswer).parentNode.classList.add('bg-danger'); // roten Hintergrund anzeigen
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success'); // grünen Hintergrund anzeigen bei der richtigen Antwort
        audio_fail.play(); // fail sound abspielen
    }
    document.getElementById('next-button').disabled = false; // entfernen des disabled-attributes
}

function rightAnswerSelected(selectedAnswerNumber, question) {
    return selectedAnswerNumber == question['right_answer'];// abgleichen: ausgewählte Antwort mit der richtigen Antwort-Nummer
}

function nextQuestion() {
    current_question++; // Wert um 1 erhöhen (oben als 0 definiert)
    document.getElementById('next-button').disabled = true;
    audio_click.play(); // klick Geräusch abspielen
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
}

function restartGame() {
    audio_click.play(); // klick Geräusch abspielen
    document.getElementById('header-img').src = 'img/quiz.jpg'; // Pokal Bild durch Standard header-img ersetzten
    current_question = 0; // Zähler wieder auf 0 zurücksetzen
    rightAnswers = 0; // Zähler wieder auf 0 zurücksetzen
    document.getElementById('endScreen').style = 'display: none;'; // endScreen wieder auf display: none; setzten
    document.getElementById('question-body').style = '' // question-body wieder anzeigen
    init(); // Spiel starten
}

function showEndScreen() {
    document.getElementById('endScreen').style = ''; // display: none wird vom endScreen entfernt
    document.getElementById('question-body').style = 'display: none;' // display: none wird dem question-body hinzugefügt
    document.getElementById('header-img').src = './img/trophy.png'; // header-img wird durch den pokal ersetzt
    document.getElementById('total-questions-end').innerHTML = questions.length; // Gesamtanzahl der Fragen einfügen
    document.getElementById('total-right-answers').innerHTML = rightAnswers; // Gesamtzahlt der richtig beantworteten Fragen
}

function updateToNextQuestion() {
    let question = questions[current_question]; // current_question wird durch klicken auf nextQuestion immer um 1 erhöht

    document.getElementById('current-question').innerHTML = current_question + 1; // current_question ist als 0 definiert, die erste Frage soll aber als Frage 1 angezeigt werden 
    document.getElementById('question').innerHTML = question['question']; // Anzeigen bei welcher Frage wir sind
    document.getElementById('answer_1').innerHTML = question['answer_1']; // Antwortmöglichkeiten aus dem Array einfügen
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function updateProgressBar() {
    let percent = (current_question + 1) / questions.length; // progress bar Wert ermitteln
    percent = Math.round(percent * 100); // umrechnen in % und auf ganze Zahl runden
    document.getElementById('progress-bar').innerHTML = `${percent}%`; // Prozentzahl in der Progressbar anpassen
    document.getElementById('progress-bar').style = `width: ${percent}%;`; // Länge der Progressbar anpassen
}