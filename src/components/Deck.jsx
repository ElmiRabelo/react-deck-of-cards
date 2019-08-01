import React from "react";
import axios from "axios";
import Card from "./Card";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deck: null, drawnCards: [] };
    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    //fazendo request para api e coletando os dados
    let deckAPI = await axios.get(`${API_BASE_URL}/new/shuffle/`);
    this.setState({ deck: deckAPI.data });
  }

  //Faz uma request para API para obter um card
  async getCard() {
    let deckId = this.state.deck.deck_id;
    //Try para quando os cards acabarem um alert seja mostrado.
    try {
      let cardUrl = `${API_BASE_URL}/${deckId}/draw/`;
      let cardResp = await axios.get(cardUrl);
      console.log(cardResp);
      if (cardResp.data.remaining.success === false) {
        throw new Error("No Card Remaing");
      }

      let cardData = cardResp.data.cards[0];
      this.setState(st => ({
        drawnCards: [
          ...st.drawnCards,
          {
            id: cardData.code,
            image: cardData.image,
            name: `${cardData.value} of ${cardData.suit}`
          }
        ]
      }));
    } catch (err) {
      alert(err);
    }
  }

  render() {
    const renderCards = this.state.drawnCards.map(card => (
      <Card image={card.image} name={card.name} key={card.id} />
    ));
    return (
      <div className="Deck">
        <h1>Deck Dealer</h1>
        <button onClick={this.getCard}> Get a Card </button>
        {renderCards}
      </div>
    );
  }
}

export default Deck;
