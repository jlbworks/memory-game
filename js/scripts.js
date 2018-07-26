$(document).ready(function() {
	////////////////////
	// Variables     //
	///////////////////

	// Display time on #time span
	const display = document.querySelector('#time');
	const displayCounter = document.querySelector('#moveCounter');
	// Create Array of Icons Classes
	let cards = ['fa-allergies', 
		'fa-allergies', 
		'fa-american-sign-language-interpreting', 
		'fa-american-sign-language-interpreting', 
		'fa-car', 
		'fa-car', 
		'fa-assistive-listening-systems', 
		'fa-assistive-listening-systems',
		'fa-bed',
		'fa-bed',
		'fa-child',
		'fa-child'];


	// Declare Variables that store clicks and win condition
	let cardValue = ''; 
	let cardID = '';
	let winValue = 0;
	let scoreKeeper = 0;
	//  Time Variables
	let timer = 30;
	let inVal;
	let remainingTime;

	/////////////////////////////////////
	// Function for reseting stored card
	/////////////////////////////////////
	function clearVar() {
		cardValue = '';
		cardID = '';
	}

	///////////////////////////////////
	// Fisher-Yates (aka Knuth) Shuffle
	// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	///////////////////////////////////
	function shuffle(array) {
		let currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
		}

		return array;
	}

	//////////////////////////////////////////////
	// Create Clickers function for clicking cards
	////////////////////////////////////////////// 
	function clickers() {

		// Increase score for stars
		scoreKeeper++;
		displayCounter.textContent = scoreKeeper;
		// If you click a card and none have been selected 
		if ( cardValue === '' && cardID != $(this).attr('data-id') ) {

			// Adds Class and stores values
			cardValue = $(this).attr('data-at');
			cardID = $(this).attr('data-ID');
			$(this).addClass('selected');

		// Checks if you click the same card twice and does nothing
		} else if ( cardValue === $(this).attr('data-at') && cardID === $(this).attr('data-id')) {

		// If you match the currently selected card
		} else if ( cardValue === $(this).attr('data-at')) {

			// Removes the Selected class and adds Correct class
			$('.selected').addClass('correct').removeClass('selected');
			$(this).addClass('correct');

			// Increases Win Counter
			winValue++;

			// Clears stored variables
			clearVar();

		// If they pick the wrong one show the card then remove selected and clear stored variables.
		} else {
			$(this).addClass('selected');
			// Remove Ability to click
			$('html').addClass('no-point');
			setTimeout(function () {
				$('.selected').removeClass('selected');
				clearVar();
				// After .5s allow clicking
				$('.no-point').removeClass('no-point');
			}, 500);
		}

		if (winValue === 6 && timer > 0){
			remainingTime = 29 - timer;
			$('#tr').text(remainingTime);
			if( scoreKeeper < 20) {
				$('<i class="far fa-star"></i>').appendTo('.rating');
				$('<i class="far fa-star"></i>').appendTo('.rating');
				$('<i class="far fa-star"></i>').appendTo('.rating');				
			} else if (scoreKeeper < 30) {
				$('<i class="far fa-star"></i>').appendTo('.rating');
				$('<i class="far fa-star"></i>').appendTo('.rating');
			} else {
				$('<i class="far fa-star"></i>').appendTo('.rating');
			}
			clearVar();
			clearInterval(inVal);
			winValue = 0;
			$('.you-win').addClass('active');
		}
	}

	/////////////////////
	// Countdown Timer
	////////////////////
	function startTimer(display) {
		timer = 30;
		clearInterval(inVal);
		inVal = setInterval(function () {
			let seconds = timer % 60;
			seconds = seconds < 10 ? "0" + seconds : seconds;
			display.textContent = seconds;
			if(timer > 0) {
			--timer;
			} else {
				$('.you-lose').addClass('active');
				clearInterval(inVal);		
			}
		}, 1000);
	}

	///////////////
	// Reset Game
	///////////////
	function reset() {
		// Remove Ability to Click
		$('html').addClass('no-point');
		// Randomizes the Array
		cards = shuffle(cards);

		// Removes the Cards		
		$( ".card-holder" ).empty();
		// Reset Stored Values
		winValue = 0;
		clearVar();

		// Create the Cards
		for (i = 0; i < cards.length; i++) {
			$( '<div class="cards" data-id="card' + i +'" data-at="' + cards[i] + '"><i class="far ' + cards[i] + '"></i><i class="fas fa-question-circle"></i></div>' ).appendTo('.card-holder');
		}

		// Reset Score
		scoreKeeper = 0;
		displayCounter.textContent = scoreKeeper;

		$('.rating').empty();
		$('#tr').empty();

		// Reinitialize Card Click storing
		$( ".cards").click(clickers);
		// Reset Timer
		startTimer(display);
		setTimeout(function () {
		// Allow clicking again
			$('.no-point').removeClass('no-point');
		}, 1000);
	}

	///////////////////////////////////////////////
	// On Page Load Create Cards ( visual only ) //
	//////////////////////////////////////////////

	// Use Shuffle fucntion to shuffle Array
	cards = shuffle(cards);
	
	// Loop Through Array and Create Cards
	let i = 0
	for (i = 0; i < cards.length; i++) {
		$( '<div class="cards" data-id="card' + i +'" data-at="' + cards[i] + '"><i class="far ' + cards[i] + '"></i><i class="fas fa-question-circle"></i></div>' ).appendTo('.card-holder');
	}

	///////////////////
	// Click Actions //
	///////////////////

	// On Click of Card run Clickers function
	// $( ".cards").click(clickers);

	// Reset Cards on button click
	$( ".reset" ).click(function() {
		reset();
	});

	// Closes the You Win Modal
	$( ".close-modal" ).click(function() {
		$('.active').removeClass('active');
		reset();
	});
});