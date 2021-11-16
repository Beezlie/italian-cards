import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { Row } from 'react-bootstrap';

import CardGrid from './CardGrid';
import { getValueFromCardKey } from './CardUtil';
import { subscribeTo } from '../Socket/GameSubscriptions';
import { emit } from '../Socket/GameEmitters';
import { updateAfterTurn, startRound } from '../../store/actions/GameActions';
import { restUrl } from '../../env';
import ScopaAnimation from './ScopaAnimation';

class CardContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            playerHand: [],
            tableCards: [],
            cardSelection: []
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
            //Add card played to table cards
            this.setState(state => ({
                tableCards: [...this.state.tableCards, { key: data.cardPlayed, isFlipped: true }]
            }));

            //Remove cards from table if any were taken
            if (data.cardsPickedUp.length) {
                const updatedTableCards = this.state.tableCards
                    .filter(card => card.key !== data.cardPlayed && !data.cardsPickedUp.includes(card.key));
                this.setState(state => ({
                    tableCards: updatedTableCards,
                }));
            }
            updateAfterTurn(data);
        });
    }

    handleTableCardSelection = (cardKey) => {
        const { cardSelection } = this.state;

        const playerCard = this.state.cardSelection.find(card => card.isPlayerCard);
        if (playerCard) {
            const newCardSelection = [...cardSelection, { key: cardKey, isPlayerCard: false }];
            const tableCardSelection = newCardSelection
                .filter(card => !card.isPlayerCard)
                .map(card => card.key);
            if (this.cardSelectionsMatch(playerCard.key, tableCardSelection)) {
                this.pickUpCards(playerCard.key, tableCardSelection);
            } else {
                this.setState(state => ({
                    cardSelection: newCardSelection,
                }));
            }
        }
    }

    handlePlayerCardSelection = (cardKey) => {
        const { cardSelection } = this.state;

        this.getMatchingCardSets(cardKey)
            .then(result => {
                if (result.length === 0) {
                    // Selected card can't pick up any other cards. It goes out of the hand and to the table
                    this.removeCardFromHand(cardKey);
                    emit.sendPlayerMove(cardKey, []);
                } else if (result.length === 1) {
                    // Only one available move so player must take it
                    this.pickUpCards(cardKey, result[0].matches);
                } else {
                    // There are multiple matching sets. Player must choose manually from the table cards
                    let newCardSelection = [...cardSelection, { key: cardKey, isPlayerCard: true }];
                    this.setState(state => ({
                        cardSelection: newCardSelection,
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

    cardSelectionsMatch = (playerCardKey, tableCardSelectionKeys) => {
        const tableCardTotalValue = tableCardSelectionKeys
            .map(cardKey => getValueFromCardKey(cardKey))
            .reduce((pv, cv) => pv + cv, 0);
        return getValueFromCardKey(playerCardKey) === tableCardTotalValue;
    }

    pickUpCards = (playerCardKey, tableCardSelectionKeys) => {
        this.removeCardFromHand(playerCardKey);
        this.resetCardSelection();
        emit.sendPlayerMove(playerCardKey, tableCardSelectionKeys);
	}

    resetCardSelection = () => {
        this.setState(state => ({
            cardSelection: [],
        }));
    }

    removeCardFromHand = (cardKey) => {
        const { playerHand } = this.state;
        
        const newPlayerHand = playerHand.filter(function (card) {
            return card.key !== cardKey;
        });
        this.setState(state => ({
            playerHand: newPlayerHand,
        }));
    }

    render() {
        const { tableCards, playerHand, cardSelection } = this.state;

        return (
            <Row className="card-container">
                <ScopaAnimation
                    tableCards={tableCards}
                />
                <CardGrid
                    type="table-cards"
                    cards={tableCards}
                    cardSelection={cardSelection}
                    handleCardSelection={this.handleTableCardSelection}
                    resetCardSelection={this.resetCardSelection}
                />
                <CardGrid
                    type="player-cards"
                    cards={playerHand}
                    cardSelection={cardSelection}
                    handleCardSelection={this.handlePlayerCardSelection}
                    resetCardSelection={this.resetCardSelection}
                />
            </Row>
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