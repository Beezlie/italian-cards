import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import CardGrid from './CardGrid';
import CardDeck from './CardDeck';
import Card from './Card';
import { getValueFromCardKey } from './CardUtil';
import { subscribeTo } from '../Socket/GameSubscriptions';
import { emit } from '../Socket/GameEmitters';
import { updateAfterTurn, startRound } from '../../store/actions/GameActions';
import { restUrl } from '../../env';

class CardContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playerHand: [],
            tableCards: [],
            playerCardSelected: "",
            cardSelection: [],
            lastCardPlayed: "",
        };
        const { startRound, updateAfterTurn } = this.props;

        subscribeTo.startRound((err, data) => {
            const initTableCards = data.tableCards.map(function (cardKey) {
                return { key: cardKey, isFlipped: true }
            });
            const initPlayerHand = data.playerHand.map(function (cardKey) {
                return { key: cardKey, isFlipped: true }
            });
            this.setState(state => ({
                tableCards: initTableCards,
                playerHand: initPlayerHand,
            }));
            startRound(data);
        });

        subscribeTo.updateAfterTurn((err, data) => {
            const newTableCards = data.tableCards.map(function (cardKey) {
                return { key: cardKey, isFlipped: true }
            });
            this.setState(state => ({
                tableCards: newTableCards,
                lastCardPlayed: data.playerCard,
            }));
            updateAfterTurn(data);
        });
    }

    handleTableCardSelection = (cardKey) => {
        const { playerCardSelected, cardSelection } = this.state;

        if (playerCardSelected) {
            let newCardSelection = [...cardSelection, cardKey];
            if (this.cardSelectionsMatch(playerCardSelected, newCardSelection)) {
                this.pickUpCards(playerCardSelected, newCardSelection);
            } else {
                this.setState(state => ({
                    cardSelection: newCardSelection,
                }));
            }
        }
    }

    handlePlayerCardSelection = (cardKey) => {
        const { tableCards } = this.state;

        this.getMatchingCardSets(cardKey)
            .then(result => {
                if (result.length === 0) {
                    // Selected card can't pick up any other cards. It goes out of the hand and to the table
                    this.removeCardFromHand(cardKey);
                    this.setState(state => ({
                        tableCards: [...tableCards, { key: cardKey, isFlipped: true }],
                    }));
                    emit.sendPlayerMove(cardKey, []);
                } else if (result.length === 1) {
                    // Only one available move so player must take it
                    this.pickUpCards(cardKey, result[0].matches);
                } else {
                    // There are multiple matching sets. Player must choose manually from the table cards
                    this.setState(state => ({
                        playerCardSelected: cardKey,
                    }));
                }
            })
            .catch(e => {
                console.log("Unable to retrieve matching card sets: " + e.message);
            });
    }

    getMatchingCardSets = async (cardKey) => {
        const { tableCards } = this.state;
        const data = {
            tableCards: tableCards.map(card => card.key),
            playerCard: cardKey
        };
        try {
            const response = await axios.post(`${restUrl}/game/getMatchingCardSets`, data);
            if (!response.data.success || !response) {
                //TODO - how to handle error?
                console.log("Unable to retrieve matching card sets");
            }
            return response.data.result;
        } catch (error) {
            console.log(error.message);
            //TODO - how to handle error?
        }
    };

    cardSelectionsMatch = (playerCard, cardSelection) => {
        const cardSelectionTotal = cardSelection
            .map(card => getValueFromCardKey(card))
            .reduce((pv, cv) => pv + cv, 0);
        return playerCard && getValueFromCardKey(playerCard) === cardSelectionTotal;
    }

    pickUpCards = (playerCard, cardSelection) => {
        this.removeCardFromHand(playerCard);
        this.removeCardsFromTable(cardSelection);
        this.resetCardSelection();
        emit.sendPlayerMove(playerCard, cardSelection);
	}

    resetCardSelection = () => {
        this.setState(state => ({
            playerCardSelected: '',
            cardSelection: [],
        }));
    }

    removeCardFromHand = (playerCard) => {
        const { playerHand } = this.state;
        
        const newPlayerHand = playerHand.filter(function (card) {
            return card.key !== playerCard;
        });
        this.setState(state => ({
            playerHand: newPlayerHand,
        }));
    }

    removeCardsFromTable = (cardSelection) => {
        const { tableCards } = this.state;

        const newTableCards = tableCards.filter(function (card) {
            return cardSelection.indexOf(card.key) < 0;
        });
        this.setState(state => ({
            tableCards: newTableCards,
        }));
    }

    renderLastPlayedCard = () => {
        const { lastCardPlayed } = this.state;
        if (lastCardPlayed) {
            return (
                <Card
                    cardKey={lastCardPlayed}
                />
            );
        } else {
            return null;
		}
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
                        {this.renderLastPlayedCard()}
                    </div>
                    <div className="game-main-panel">
                        <CardGrid
                            type="table-cards"
                            cards={tableCards}
                            handleCardSelection={this.handleTableCardSelection}
                            resetCardSelection={this.resetCardSelection}
                        />
                        <CardGrid
                            type="player-cards"
                            cards={playerHand}
                            handleCardSelection={this.handlePlayerCardSelection}
                            resetCardSelection={this.resetCardSelection}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

CardContainer.propTypes = {
    startRound: PropTypes.func,
    updateAfterTurn: PropTypes.func,
};

const mapStateToProps = (state = {}) => {
    return { ...state };
};

const mapDispatchToProps = dispatch => ({
    startRound: data => dispatch(startRound(data)),
    updateAfterTurn: data => dispatch(updateAfterTurn(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);