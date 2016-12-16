//Nested Array to change photos once clicked
var images = new Array ();
images[0] = new Array ("koala.jpg","left.jpg","koalaa.jpg");
images[1] = new Array ("koala.jpg","left.jpg","koalaa.jpg");
images[2] = new Array ("koala.jpg","left.jpg","koalaa.jpg");
//var currentAlbum = document.getElementsByClassName('slide')[0]
var currentpic = 0;
var lastpic = images.length-1;
//console.log(document.getElementsByClassName('slide')[0]);
function nextslide(clicked_id)
{
    console.log(Number(clicked_id));
    console.log(document.getElementsByClassName('slide')[Number(clicked_id)].src);
    if (currentpic == lastpic)
    {
        currentpic = 0;
        document.getElementsByClassName('slide')[Number(clicked_id)].src = images[0][currentpic];
    }
    else
    {
        currentpic++;
        document.getElementsByClassName('slide')[Number(clicked_id)].src = images[0][currentpic];
    }
}

//Code modified from http://codepen.io/gcarino/pen/LDgtn
(function() {
  var questions = [{
    question: "Which statement below best describe 'The Point' gesture?",
    choices: ["I’ve got this exactly right.", "I will create the wall on Mexican border.", "You are fire!", "Look, I'm being honest."],
    correctAnswer: 2,
    picture: 'http://i.giphy.com/3oriNLiwO1OP90MMSc.gif'
  }, {
    question: "Without hearing Trump's voice, how does his gesture helps him to communicate his verbal message (subtitle)?",
    choices: ["What a silly thought!", "You are one of us.", "Don't mess with me.", "I want to make this point clear."],
    correctAnswer: 3,
    picture: 'http://i.giphy.com/l3vRffwwvbWGhaz3W.gif'
  }, {
    question: "Why does using the 'Open Palms' gesture is appropriate in this context?",
    choices: ["Using the word 'we,' Trump wants to create an inclusive sense that we are all in this together.", "Trump wants to drive the ones who make the country 'sloppy' away.", "Using the open palms gesture, he wants to tell his audience that this won't happen if he is elected", "His palms indicates that Trump is disapproving this situation."],
    correctAnswer: 0,
    picture: 'http://i.giphy.com/3oz8xWKgkO1qmNKAHC.gif'
  }, {
    question: "What does this gesture indicate?",
    choices: ["For sure, you need to believe me.", "This is OK", "We are all in this together", "I just made my point."],
    correctAnswer: 0,
    picture: 'http://i.giphy.com/l46C4BfzCQb0JAXM4.gif'
  }, {
    question: "Do you believe him?",
    choices: ["It's your choice"],
    correctAnswer: 0,
    picture: 'http://i.giphy.com/26BRNoQJ5bRcZS8Hm.gif'
  }];

  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object

  // Display initial question
  displayNext();

  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();

    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {
      return false;
    }
    choose();

    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });

  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });

  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });

  // Creates and returns the div that contains the questions and
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h3>Question ' + (index + 1) + ':</h3>');
    qElement.append(header);

    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    var image = $('<img>').attr('src', questions[index].picture);
    qElement.append(image);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();

      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }

        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){

          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }

  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});

    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }

    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!! Following are the right answers. Question 1: You are fire! Question 2: I want to make this point clear. Question 3: Using the word we, Trump wants to create an inclusive sense that we are all in this together. Question4:For sure, you need to believe me. Question 5: It is your choice.');
    return score;
  }
})();

$('#tommy').on('slid.bs.carousel', function(e){
	var imgEl = e.currentTarget.querySelector('.item.active img');

	if (imgEl.alt === 't15') {
		alert('slid');
	}

});
