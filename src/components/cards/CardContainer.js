import React from 'react';
import PropTypes from 'prop-types';

import CardGrid from './CardGrid';
import CardDeck from './CardDeck';
import { subscribeTo } from '../Socket/GameSubscriptions';

class CardContainer extends React.Component {
    state = {
        playerHand: [],
        tableCards: [],
        playerHandSelection: '',
        cardSelection: [],
    };

    constructor(props) {
        super(props);

        subscribeTo.gameStart((err, data) => {
            this.setState(state => ({
                tableCards: data.tableCards,
                playerHand: data.playerHand,
            }));
        });
    }

    render() {
        const { tableCards, playerHand } = this.state;

        return (
            <div className="game-container">
                <div className="table">
                    <div className="game-left-panel">
                        <CardDeck
                            numCardsInDeck={6}
                        />
                    </div>
                    <CardGrid
                        cards={tableCards}
                    />
                </div>
                <div className="player-hand">
                    <CardGrid
                        cards={playerHand}
                    />
                </div>
            </div>
        );
    }
}

export default CardContainer;