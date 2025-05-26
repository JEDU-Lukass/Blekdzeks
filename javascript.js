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
let cardSymb  = ["♠","♥","♦","♣"];
// empty array of a full deck
let deckUnshuffled = [];
let deck;

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
// shuffles deck and assigns array to deck variable
function shuffleDeck(array) {
	array.sort(() => Math.random() - 0.5);
	return array;
}

function gameStart(){

	console.log("[DEBUG] New Game")
	document.querySelector("#hit").disabled = 0;
	document.querySelector("#stay").disabled = 0;
	document.querySelector("#winner").style.display = "none";


	document.querySelector("#start").style.display = "none";
	document.querySelector("#hit").style.display = "inline";
	document.querySelector("#stay").style.display = "inline";
	document.querySelector(`#new`).style.display = "inline";

	// create empty arrays of player and dealer cards
	cardsDealer = [];
	cardsPlayer = [];
	// creates a shuffled deck
	deck = shuffleDeck([...deckUnshuffled]);

	// deals cards to dealer and players from deck (sequentially from the end of the deck)
	for (i=0;i<2;i++){
		cardsDealer.push(deck.at(-1));
		deck.pop(deck.at(-1));
		cardsPlayer.push(deck.at(-1));
		deck.pop(deck.at(-1));
	}

update_values(cardsDealer);
document.querySelector(`#dealer_status`).innerHTML = "";
update_values(cardsPlayer);
document.querySelector("#player_cards").innerHTML = cardsPlayer
document.querySelector("#dealer_cards").innerHTML = `${cardsDealer[0]},???`

}

function update_values(cards) {
	let nameofcards

	if (cards == cardsDealer) {
		nameofcards = "dealer";
	}else if (cards == cardsPlayer){
		nameofcards = "player"; 
	}else{return}

	let sumofcards = value(cards)
	if (sumofcards < 21) {
		document.querySelector(`#${nameofcards}_status`).innerHTML = `Sum: ${sumofcards}`;
	}else if (sumofcards == 21 && cards.length == 2) {
		document.querySelector(`#${nameofcards}_status`).innerHTML = `Sum: ${sumofcards}\nBLACKJACK`;
	}else if (sumofcards == 21 && cards.length > 2) {
		document.querySelector(`#${nameofcards}_status`).innerHTML = `Sum: ${sumofcards}`;
		if (cards == cardsPlayer){stay();}
	}else if (sumofcards > 21) {
		document.querySelector(`#${nameofcards}_status`).innerHTML = `Sum: ${sumofcards}\nBUST`;
		if (cards == cardsPlayer){stay();}
	}
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
			return minSum;
		}
		// Otherwise, return both possibilities
		else {
			return maxSum;
		}
	}
	// No Aces, return normal sum
	else {
		return sum;
	}
}

function hit(cards) {
	cards.push(deck.at(-1));
	deck.pop(deck.at(-1));
	if(cards == cardsPlayer){
		console.log("[DEBUG] Hit (player)");
		document.querySelector("#player_cards").innerHTML = cards
	}else{
		console.log("[DEBUG] Hit (dealer)");
		document.querySelector("#dealer_cards").innerHTML = cards
	}
	update_values(cards);

}

function stay() {
	// endgame
	console.log("[DEBUG] Stay")
	document.querySelector("#hit").disabled = "true";
	document.querySelector("#stay").disabled = "true";
	document.querySelector("#dealer_cards").innerHTML = cardsDealer
	document.querySelector(`#dealer_status`).innerHTML = `Sum: ${value(cardsDealer)}`;

	// dealer code 
	while (value(cardsDealer) < 17){
		hit(cardsDealer)
	}

	document.querySelector("#winner").style.display = "block";
	document.querySelector("#winner").innerHTML = `Winner = ${winner()}`;
	console.log(`Result: ${winner()} won`)
}

function handleStay() {
    stay();
    update_values(cardsDealer);
}

function winner() {
	const valueDealer = value(cardsDealer);
	const valuePlayer = value(cardsPlayer);
	if (valueDealer > valuePlayer && valueDealer <= 21 ){
		return "Dealer";
	}else if (valueDealer > 21 && valuePlayer > 21){
		return "Even";
	}else if (valueDealer > valuePlayer && valueDealer > 21){
		return "Player";
	}else if (valueDealer < valuePlayer && valuePlayer <= 21 ){
		return "Player";
	}else if (valueDealer < valuePlayer && valuePlayer > 21){
		return "Dealer"
	}else if (valueDealer == valuePlayer && valueDealer <= 20){
		return "Even";
	}else if (valueDealer == valuePlayer && valueDealer == 21){
		if (cardsDealer.length > cardsPlayer.length){
			return "Player";
		}else if (cardsDealer.length < cardsPlayer.length){
			return "Dealer";
		}else{
			return "Even";
		}
	}
}


