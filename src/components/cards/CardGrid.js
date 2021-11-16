import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from "framer-motion";
import './GameStyles.scss'
import TableCard from './TableCard';
import PlayerCard from './PlayerCard';

const CardGrid = (props) => {
    const { cards, type, cardSelection, handleCardSelection, resetCardSelection } = props;

    const renderTableCards = (keys) => {
        //TODO - move the AnimatePresence to the TableCard component - makes more sense there
        //TODO - fix bug with AnimatePresence for scopa
        return (
            <AnimatePresence>
                {keys.map((key, index) => (
                    <motion.div
                        key={cards[key].key}
                        initial={false}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        <TableCard
                            key={cards[key].key}
                            cardKey={cards[key].key}
                            cardSelection={cardSelection}
                            handleCardSelection={handleCardSelection}
                            resetCardSelection={resetCardSelection}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        );
    }

    const renderPlayerCards = (keys) => {
        return keys.map((key, index) => (
            <div className="player-card">
                <PlayerCard
                    key={cards[key].key}
                    cardKey={cards[key].key}
                    isFlipped={cards[key].isFlipped}
                    cardSelection={cardSelection}
                    handleCardSelection={handleCardSelection}
                    resetCardSelection={resetCardSelection}
                />
             </div>
        ));
    }

    const renderCards = () => {
        if (cards && cards.length) {
            const keys = Object.keys(cards);

            if (type === "table-cards") {
                return renderTableCards(keys);
            } else {
                return renderPlayerCards(keys);
			}
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
    cardSelection: PropTypes.array,
    handleCardSelection: PropTypes.func,
    resetCardSelection: PropTypes.func,
};

export default CardGrid;