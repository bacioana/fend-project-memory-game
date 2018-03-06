/*
 * Create a list that holds all of your cards
 */
const game={
	cards:[],
	compArray:[],
	minutes:0,
	seconds:0,
	movesNum:0,
	stars:3,
}


$('.card').each(function(){
	game.cards.push($(this).find('i').attr('class'));
})

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Updating the list with the new cards

function updateCards(){
	game.cards=shuffle(game.cards);
	let i=0;
	while(i<=game.cards.length){	
		$('.card').each(function(){	
			let a=game.cards[i];		
			$(this).find('i').attr('class',a);
			i++;
		});	
	};
}

// initial call to begin with brand new game each time

updateCards();

// event listener for the restart button

$('.restart').on('click',function(){
	$('.card').attr('class','card');
	updateCards();
	game.movesNum=0;
	moves.text(`${game.movesNum} Moves`);
	game.stars=3;
	$('.fa-star').removeClass('hiddenStars');
	$('.deck').removeClass('hiddenItems');
	$('.checkMarkContainer').addClass('hiddenItems');
	$('.winParContainer').addClass('hiddenItems');
	$('.timer').addClass('hiddenItems');
	deckOfCards.on('click','li', restartTimer);
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

const deckOfCards = $('.deck');

// function that opens the cards

function openCard(x){
	x.addClass('open show');
}

// function that locks the cards that match

function lockOpen (x) {	
	$(`.${x}`).each(function(){
		$(this).addClass('match');
		$(this).removeClass('open show');		
	});	
}

// function that hides the cards that didn't match

function hideCards (x){
	$(`.${x}`).each(function(){
		$(this).removeClass('open show',1500);		
	});	
}

// function that compares the open cards and updates the moves number


let moves=$('.moves');

function matching (card) {	
	let x = card.find('i').attr('class');
	game.compArray.push(x);
	if(game.compArray.length===2){
				game.movesNum++;
				moves.text(`${game.movesNum} Moves`);
				if(game.movesNum>10&&game.movesNum<14){
					$('#thirdStar').addClass('hiddenStars');
					game.stars=2;
				} else if (game.movesNum>14) {
					$('#secondStar').addClass('hiddenStars');
					game.stars=1;
				}
				if(game.compArray[0]===game.compArray[1]){					
					lockOpen('open');
					game.compArray=[];
				} else {
					hideCards('open');
					game.compArray=[];
				}   		
		}
}

// function that congratulates the winner

function win(){
	const matchedCards = $('.match').length;
	if(matchedCards===16){
		$('.deck').addClass('hiddenItems');
		$('.checkMarkContainer').removeClass('hiddenItems');
		$('.timer').addClass('hiddenItems');
		$('.winPar').text(`Congratulations! You won. \nMoves: ${game.movesNum}. \nStars: ${game.stars}. \nYour time: ${game.minutes}m:${game.seconds}s. \nPlay again!`);
		$('.winParContainer').removeClass('hiddenItems');
	}
}

// event listener that handles the matching of cards

deckOfCards.on('click','li', function(){
	if(!($(this).hasClass('match')||($(this).hasClass('open')))){
		openCard($(this));					
		matching($(this));
	}	
	win();
});

// timer function

function timing(){
	deckOfCards.off('click','li', timing);
	setInterval(function (){
	  	let time=function (){
	  		if (game.seconds<60){
	  			game.seconds++;
	  		} else if(game.seconds === 60){
	  			game.minutes++;
	  			game.seconds=0;
	  		}
	  		return `${game.minutes}:${game.seconds}`;
	  	}
	  	$('.timer').text(time);
	},1000);
}

deckOfCards.on('click','li', timing);

function restartTimer () {
	game.minutes=0;
	game.seconds=0;
	deckOfCards.off('click','li', restartTimer);	
	$('.timer').removeClass('hiddenItems');
}

