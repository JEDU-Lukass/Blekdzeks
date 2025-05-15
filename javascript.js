// Jēkabpils Valsts ģimnāzijas
// 11.a klases skolnieka
// Lūkasa Aukmaņa
// projekta darbs kursā Programmēšana I
// 2025. gada maijā

// Komentāri angļu valodā.

// array of all card "numbers", including ace, jack, queen and king
let cardNr = ["A",2,3,4,5,6,7,8,9,10,"J","Q","K"];
// array of card symbols
// spades S (♠), hearts H (♥), diamonds D (♦), clubs C (♣)
let cardSymb  = ["S","H","D","C"];
// empty array of a full deck
let deckUnshuffled = [];

const cardValues = {
	"2": 2, "3": 3, "4": 4, "5": 5, "6": 6,
	"7": 7, "8": 8, "9": 9, "1": 10, // 1 kodā = 10
	"J": 10, "Q": 10, "K": 10
};

// full deck builder
// combines elements of card numbers array with card symbols array
// e.g. one + hearts -> one of hearts; two + hearts -> two of hearts and so on
for (let element1 of cardSymb){
	for (let element2 of cardNr) {
		card = element2+element1;
		deckUnshuffled.push(card);
	}
}

let cardsDealer = [];
let cardsPlayer = [];

function gameStart(){
	document.querySelector("#start").style.display = "none";
	document.querySelector("#hit").style.display = "inline";
	document.querySelector("#stay").style.display = "inline";
	// shuffles deck and assigns array to deck variable
	function shuffleDeck(array) {
			array.sort(() => Math.random() - 0.5);
			return array;
	}

	// dictionary of card "number" values

	// create empty arrays of player and dealer cards
	cardsDealer = [];
	cardsPlayer = [];

	// creates a shuffled deck
	deck = shuffleDeck(deckUnshuffled);

	// deals cards to dealer and players from deck (sequentially from the end of the deck)
	for (i=0;i<2;i++){
		cardsDealer.push(deck.at(-1));
		deck.pop(deck.at(-1));
		cardsPlayer.push(deck.at(-1));
		deck.pop(deck.at(-1));
	}
console.log("dealer: ", cardsDealer);
value(cardsDealer);
console.log("player: ", cardsPlayer);
value(cardsPlayer);
console.log("----------------------")

}

// calculates the values of cards
function value(cards) {
	let sum = 0;
	let numberOfAces = 0;
	let valuesOfGivenCards = [];

	// Extract card values (first character)
	for (let element of cards) {
		valuesOfGivenCards.push(element.slice(0, 1));
	}

	// First calculate sum of non-Ace cards
	for (let element of valuesOfGivenCards) {
		if (element !== "A") {
			sum += parseInt(cardValues[element]);
		} else {
			numberOfAces++;
		}
	}

	// Calculate possible sums if there are Aces
	if (numberOfAces > 0) {
		// Minimum possible sum (count all Aces as 1)
		let minSum = sum + numberOfAces;
		
		// Maximum possible sum (count one Ace as 11, others as 1)
		let maxSum = sum + 11 + (numberOfAces - 1);
		
		// If maxSum exceeds 21, all Aces must be 1
		if (maxSum > 21) {
			console.log(valuesOfGivenCards);
			console.log("sum: ", minSum);
			return minSum;
		}
		// Otherwise, return both possibilities
		else {
			console.log(valuesOfGivenCards);
			console.log("sum: ", minSum + " or " + maxSum);
			return [minSum,maxSum]
		}
	}
	// No Aces, return normal sum
	else {
		console.log(valuesOfGivenCards);
		console.log("sum: ", sum);
		return sum;
	}
}

function hit(cards) {
	alert("hit pressed");
	cards.push(deck.at(-1));
	deck.pop(deck.at(-1));

	console.log("dealer: ", cardsDealer);
	console.log("player: ", cardsPlayer);
	console.log(value(cardsDealer));
	console.log(value(cardsPlayer));

}

function stay() {
	// endgame
	alert("stay")
	document.querySelector("#hit").disabled = "true";
	document.querySelector("#stay").disabled = "true";
	console.log('------END------');

}


