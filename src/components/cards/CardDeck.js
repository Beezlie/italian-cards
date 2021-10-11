import React from 'react';
import PropTypes from 'prop-types';

import './GameStyles.scss'
import Card from './Card';

const CardDeck = () => {
    
    return (
        <div className="card-deck">
            <Card
                cardKey={'back'}
            />
        </div>
    );
}

export default CardDeck;