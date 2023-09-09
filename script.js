import { quizDataJp } from './quiz_data_jp.js';

// 質問文
const questionElm = document.getElementById('question');

// 選択肢
const a_text = document.getElementById('a-text');
const b_text = document.getElementById('b-text');
const c_text = document.getElementById('c-text');
const d_text = document.getElementById('d-text');

// 送信ボタン
const submitBtn = document.getElementById('submit');

// 問題番号指定
let currentQuiz = 0;

// 現在のスコア
let score = 0;

//◯問目
let quiznum = 0;

// 次の問題ボタン
const nextQuizBtn = document.getElementById('next-quiz');

// 
const quizHeaderElm = document.getElementById('quiz-header');
const resultsConElm = document.getElementById('results-container');
const resultsElm = document.getElementById('results');

loadQuiz();

function loadQuiz() {
  // 問題を取得
  currentQuiz = Math.floor(Math.random()*quizDataJp.length);
  const currentQuizData = quizDataJp[currentQuiz];
  

  // 質問文を表示
  questionElm.innerText = currentQuizData.question;

  // 選択肢を表示
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function getAnswered() {

  // 選択したボタンのvalueを返す
  return document.quizForm.answer.value;
}

function showResults(results) {
  quizHeaderElm.style.display = 'none';
  submitBtn.style.display = 'none';
  resultsConElm.style.display = 'block';
  resultsElm.innerText = results;
}

function showQuiz() {
  quizHeaderElm.style.display = 'block';
  submitBtn.style.display = 'block';
  resultsConElm.style.display = 'none';
}

function checkScore() {
  if (score == 3) {
    return '全問正解！おめでとう！';
  } else {
    return '残念！'+score+'点でした。';
  }
}


submitBtn.addEventListener('click', event => {
  event.preventDefault();

  // 回答を取得
  const answer = getAnswered();

  // 回答している
  if(answer) {

    // 正誤判定
    if (answer === quizDataJp[currentQuiz].correct) {
      showResults('正解！');
      document.getElementById('next-quiz').style.backgroundColor = ('#ff6969') ;
      
      score++;
      console.log(score);
    } else {
      showResults('不正解...\n\n'+quizDataJp[currentQuiz].question+'\n'+
      quizDataJp[currentQuiz].explanation);
      document.getElementById('next-quiz').style.backgroundColor = 'skyblue';
    }

    // ラジオボタンの選択を解除する
    document.getElementById(answer).checked = false;
  }
});

nextQuizBtn.addEventListener('click', event => {
  event.preventDefault();

  // 次の問題へ進む
  currentQuiz++;
  quiznum++;

  // まだ問題が残っている
  if (quiznum < 3) {
    // 次の問題を読み込む
    loadQuiz();

    showQuiz();

  // 全ての問題に回答した
  } else {
    alert(checkScore());
    window.location.href='start.html';
  }
});