// Define suits and values for the cards
const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// Create a deck of cards
export const createDeck = () => {
  let deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  return deck;
};

// Shuffle the deck
export const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

// Deal initial hands to player and dealer
export const dealInitialHands = (deck) => {
  const playerStartingHand = [deck.pop(), deck.pop()];
  const dealerStartingHand = [deck.pop(), deck.pop()];
  return { playerStartingHand, dealerStartingHand };
};

// Calculate the hand value
export const calculateHandValue = (hand) => {
  let value = 0;
  let aces = 0;

  hand.forEach(card => {
    if (card.value === 'A') {
      aces++;
      value += 11;
    } else if (['K', 'Q', 'J'].includes(card.value)) {
      value += 10;
    } else {
      value += parseInt(card.value);
    }
  });

  // Adjust for aces if the value is over 21
  while (value > 21 && aces > 0) {
    value -= 10;
    aces--;
  }

  return value;
};
