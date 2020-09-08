import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

function getElements(response) {
$('#question').html(response.results[0].question);

$('#answer').html(response.results[0].correct_answer);
}
function displayCategories() {
  let request = new XMLHttpRequest();
  const url =  "https://opentdb.com/api_category.php"

  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
      let html = '';
      for (let i=0; i<response.trivia_categories.length; i++) {
        html = '';
        html +=  `<option value="${response.trivia_categories[i].id}">`;
        html += `${response.trivia_categories[i].name}`;
        html += `</option>`;
        $('#trivia-questions').append(html);
      }
    }
  }
  request.open("GET", url, true);
  request.send();
}

function getQuestion(categoryId) {
  $('#answer').hide();
  let request = new XMLHttpRequest();
  const url =  `https://opentdb.com/api.php?amount=1&category=${categoryId}`
  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
      getElements(response);
    }
  }
  request.open("GET", url, true);
  request.send();
}

$(document).ready(function() {
  let categoryId = 9;
  getQuestion(categoryId);
  displayCategories();
$('#next-button').click(function () {
  getQuestion(categoryId);
});

$('#answer-button').click(function () {
  $('#answer').show();
});

$('#trivia-questions').change(function () {
//console.log($('#trivia-questions option:selected').val());
categoryId = $('#trivia-questions option:selected').val();
getQuestion(categoryId);
});


});

//http://jservice.io/api/random
//https://opentdb.com/api.php?amount=1&category=17