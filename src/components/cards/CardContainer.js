import React from 'react';
import PropTypes from 'prop-types';

import CardGrid from './CardGrid';
import CardDeck from './CardDeck';
import Card from './Card';
import { subscribeTo } from '../Socket/GameSubscriptions';

class CardContainer extends React.Component {
    state = {
        playerHand: [
            { name: "c1" },
        ],
        cards: [
            { name: "s2" },
            { name: "c2" },
            { name: "d2" },
            { name: "b4" },
            { name: "s3" },
            //{ name: "c3" },
            //{ name: "d3" },
            //{ name: "b3" },
        ],
        deck: [
            { name: "b1" },
            { name: "b1" },
        ],
        playerHandSelection: '',
        cardSelection: [],
    };

    constructor(props) {
        super(props);

        subscribeTo.startGame((err, data) => {
            console.log("game starting");
        });
    }

    render() {
        const { cards } = this.state;

        return (
            <div className="game-container">
                <div className="game-left-panel">
                    <CardDeck />
                    <Card
                        cardKey={'c2'}
                    />
                </div>
                <CardGrid
                    cards={cards}
                />
            </div>
        );
    }
}

export default CardContainer;