import React, { Component } from "react";
import CardList from "./CardList";
import Score from "./Score";
import "./BlackJackGame.css"

/* Main game components */
class BlackjackGame extends Component {
  static defaultProps = {
    values: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "0", "J", "Q", "K"],
    suits: ["C", "D", "H", "S"]
  };

  constructor(props) {
    super(props);
    // Initial state with a pair of cards
    this.state = {
      cards: this.getCards(2)
    };
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  /* Get a random element from an array */
  _choice(arr) {
    const randIdx = Math.floor(Math.random() * arr.length);
    return arr[randIdx];
  }

  /* Get a random value, suit combination from the card data in props. */
  getCard() {
    const randomVal = this._choice(this.props.values);
    const randomSuit = this._choice(this.props.suits);
    return randomVal + randomSuit;
  }

  /* Get numCards random cards, with no duplicates. */
  getCards(numCards=1) {
    const cardsArr = [this.getCard()];
    while (cardsArr.length < numCards) {
      let randomCard = this.getCard();
      if (!cardsArr.includes(randomCard)) cardsArr.push(randomCard);
    }
    return cardsArr;
  }

  /* Refresh cards by updating the state with new cards */
  handleRefresh() {
    const newCards = this.getCards(2);
    this.setState({ cards: newCards });
  }

  render() {
    return (
      <div className="BlackjackGame">
        <CardList cards={this.state.cards} />
        <Score cards={this.state.cards} />
        {/* Button to refresh cards */}
        <button onClick={this.handleRefresh}>Refresh Cards</button>
      </div>
    );
  }
}

export default BlackjackGame;
