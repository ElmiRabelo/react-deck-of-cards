import React from "react";
import "./Card.css";

class Card extends React.Component {
  render() {
    return (
      <div className="Card">
        <img src={this.props.image} alt={this.props.image} />
      </div>
    );
  }
}

export default Card;
