import React from 'react';
import PropTypes from 'prop-types';

import './GameStyles.scss'
import Card from './Card';

const CardDeck = (props) => {
    const { numCardsInDeck } = props;

    var cards = [];
    for (let i = 0; i < numCardsInDeck; i++) {
        cards.push(
            <div className="deck-card">
                <Card
                    cardKey={'back'}
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

export default CardDeck;