import React from "react";
import axios from "axios";

const API_URL = "https://deckofcardsapi.com/api/deck/new/shuffle/";

class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deck: null };
  }

  async componentDidMount() {
    let deckAPI = await axios.get(API_URL);
    this.setState({ deck: deckAPI.data });
  }

  render() {
    return (
      <div className="Deck">
        <h1>Deck Dealer</h1>
      </div>
    );
  }
}

export default Deck;
