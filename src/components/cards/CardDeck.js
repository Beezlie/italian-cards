import React from 'react';
import PropTypes from 'prop-types';

import './GameStyles.scss'
import Card from './Card';

const CardDeck = (props) => {
    const { numCardsInDeck } = props;

    var cards = [];
    for (let i = 0; i < numCardsInDeck; i++) {
        cards.push(
            <div className="deck-card" key={`deck_card_${i}`}>
                <Card
                    cardKey={"back"}
                />
            </div>
        );
    }

    return (
        <div className="deck">
            {cards}
        </div>
    );
}

CardDeck.propTypes = {
    numCardsInDeck: PropTypes.number,
};

export default CardDeck;