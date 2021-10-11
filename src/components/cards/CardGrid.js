import React from 'react';
import PropTypes from 'prop-types';

import './GameStyles.scss'
import Card from './Card';

const CardGrid = (props) => {
    const { cards } = props;

    const renderCards = () => {
        const keys = Object.keys(cards);

        return keys.map((key, index) => {
            return (
                <div className={"card-block"} key={`card_${index}`}>
                    <Card
                        cardKey={cards[key].name}
                    />
                </div>
            );
        });
    };

    return (
        <div className="card-grid">
            {renderCards()}
        </div>
    );
}

export default CardGrid;