import React from 'react';
import PropTypes from 'prop-types';

import './GameStyles.scss'
import FlippableCard from './FlippableCard';

const CardGrid = (props) => {
    const { cards } = props;

    const renderCards = () => {
        if (cards && cards.length) {
            const keys = Object.keys(cards);

            return keys.map((key, index) => {
                return (
                    <FlippableCard
                        key={`card_${index}`}
                        cardKey={cards[key].name}
                    />
                );
            });
        }
    };

    return (
        <div className="card-grid">
            {renderCards()}
        </div>
    );
}

export default CardGrid;