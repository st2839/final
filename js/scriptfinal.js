//Nested Array to change photos once clicked
var images = new Array();
            images[0] = "lightcard.jpg";
            images[1] = "sun.jpg";
            images[2] = "lightpole.jpg";
            var currentpic = 0;
            var lastpic = images.length-1;
            function nextslide()
            {
                if (currentpic == lastpic)
                {
                    currentpic = 0;
                    document.getElementById('slide').src = images[currentpic];
                }
                else
                {
                    currentpic++;
                    document.getElementById('slide').src = images[currentpic];
                }
            }
//proximity sensor
var pic = new Array();
            pic[0] = "proximity.jpg";
            pic[1] = "near.jpg";
            pic[2] = "door.jpg";
            var currentpicture = 0;
            var lastpicture = images.length-1;
            function nextslide2()
            {
                if (currentpicture == lastpicture)
                {
                    currentpicture = 0;
                    document.getElementById('slide2').src = pic[currentpicture];
                }
                else
                {
                    currentpicture++;
                    document.getElementById('slide2').src = pic[currentpicture];
                }
            }
//temperature sensor
            var pics = new Array();
                        pics[0] = "tempcard.jpg";
                        pics[1] = "cold.jpg";
                        pics[2] = "temp.jpg";
                        var currentimg = 0;
                        var lastimg = images.length-1;
                        function nextslide3()
                        {
                            if (currentimg == lastimg)
                            {
                                currentimg = 0;
                                document.getElementById('slide3').src = pics[currentimg];
                            }
                            else
                            {
                                currentimg++;
                                document.getElementById('slide3').src = pics[currentimg];
                            }
                        }

//Code modified from http://codepen.io/gcarino/pen/LDgtn
(function() {
  var questions = [{
    question: "What does the proximity sensor detect?",
    choices: [" light", " temperature", " something or someone near"],
    correctAnswer: 2,
    picture: "psensor.jpg"
  }, {
    question: "If Nancy wants to put a sensor on a water tap, which sensor below is the best choice?",
    choices: [" light", " proximity", " temperature"],
    correctAnswer: 1,
    picture: "tap.jpg"
  }, {
    question: "It's a hot day. Joe wants to turn on an air conditioner but the button in too high up. What kind of sensor should Joe use to have his air conditioner turns on automatically when the whether gets hotter?",
    choices: [" light", " proximity", " temperature"],
    correctAnswer: 2,
    picture: "aircon.jpg"
  }, {
    question: "The sun shines on the ....... sensor and the information is sent to the computer.",
    choices: [" light", " proximity", " temperature"],
    correctAnswer: 0,
    picture: "sunface.jpeg"
  },];

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
                 questions.length + ' right!!! Following are the right answers. Question 1: You use a PROXIMITY sensor to detect someone or something near. Question 2: Automatic water tap uses PROXIMITY sensor to detect the hands of the users. Question 3: Joe wants a temperature sensor. Question4: LIGHT sensor. Want to do it again? Click Start Over!');
    return score;
  }
})();


$('#tommy').on('slid.bs.carousel', function(e){
	var imgEl = e.currentTarget.querySelector('.item.active img');

	if (imgEl.alt === 't9') {
		alert('Click OK when you touched the proximity sensor. Did you hear the BEEP sound?');

	}

});
$('#tommy').on('slid.bs.carousel', function(e){
	var imgEl = e.currentTarget.querySelector('.item.active img');

	if (imgEl.alt === 't15') {
		alert('Click OK when you covered up the light sensor. Is the light turned on?');

	}

});
