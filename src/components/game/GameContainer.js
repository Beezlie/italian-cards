import React from 'react';
import PropTypes from 'prop-types';

import CardGrid from './CardGrid';

class GameContainer extends React.Component {
    state = {
        cards: [
            { name: "card1" },
            { name: "card2" },
        ],
    };

    constructor(props) {
        super(props);

    }

    render() {
        const { cards } = this.state;

        return (
            <div className="game-container">
                <CardGrid
                    cards={cards}
                />
            </div>
        );
    }
}

export default GameContainer;