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
                        x={0}
                        y={0}
                        width={85}
                        height={120}
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