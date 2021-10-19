import React from 'react';
import PropTypes from 'prop-types';

import './GameStyles.scss'
import DynamicCard from './DynamicCard';

const CardGrid = (props) => {
    const { cards, type, handleCardSelection, resetCardSelection } = props;

    const renderCards = () => {
        if (cards && cards.length) {
            const keys = Object.keys(cards);

            return keys.map((key, index) => {
                if (type === "table-cards") {
                    return (
                        <DynamicCard
                            key={`card_${index}`}
                            cardKey={cards[key].key}
                            isFlipped={cards[key].isFlipped}
                            handleCardSelection={handleCardSelection}
                            resetCardSelection={resetCardSelection}
                        />
                    );
                } else {
                    return (
                        <div className="player-card">
                            <DynamicCard
                                key={`card_${index}`}
                                cardKey={cards[key].key}
                                isFlipped={cards[key].isFlipped}
                                handleCardSelection={handleCardSelection}
                                resetCardSelection={resetCardSelection}
                            />
                        </div>
                    );
				}
            });
        }
    };

    return (
        <div className={type}>
            {renderCards()}
        </div>
    );
}

CardGrid.propTypes = {
    cards: PropTypes.array,
    type: PropTypes.string,
    handleCardSelection: PropTypes.func,
    resetCardSelection: PropTypes.func,
};

export default CardGrid;