import React from 'react';
import PropTypes from 'prop-types';

import './GameStyles.scss'
import Card from './Card';

const CardDeck = (props) => {
    const { numCardsInDeck } = props;

    var cards = [];
    for (let i = 0; i < numCardsInDeck; i++) {
        const style = {
            top: i / 2,
            left: i / 2,
            zIndex: i,
		}
        cards.push(
            <div key={`deck_card_${i}`} className='deck-card' style={style}>
                {i === numCardsInDeck - 1 &&
                    <div className='deck-count-overlay' style={{zIndex:numCardsInDeck}}> 
                        {numCardsInDeck}
                    </div>
                }
                <Card
                    cardKey={'back'}
                />           
            </div>
        );
    }

    return (
        <div className='deck'>
            {cards}
        </div>
    );
}

CardDeck.propTypes = {
    numCardsInDeck: PropTypes.number,
};

export default CardDeck;