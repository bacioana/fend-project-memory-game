/*
 * Create a list that holds all of your cards
 */

let cards=[];
$('.card').each(function(){
	cards.push($(this).find('i').attr('class'));
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

cards=shuffle(cards);
// Updating the list with the new cards
let i=0;
while(i<=cards.length){	
	$('.card').each(function(){	
		let a=cards[i];		
		$(this).find('i').attr('class',a);
		i++;
	});	
};

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
let count=0;
let compArray=[];
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

function matching (card) {	
	let x = card.find('i').attr('class');
	compArray.push(x);
	if(compArray.length===2){				
				if(compArray[0]===compArray[1]){					
					lockOpen('open');
					compArray=[];
				} else {
					hideCards('open');
					compArray=[];
				}   		
		}
}

// event listener that handles the matching of cards
deckOfCards.on('click','li', function(){	
	if(!($(this).hasClass('match')||($(this).hasClass('open')))){
		openCard($(this));
		let compArray=[];
		matching($(this));
	}	
});