import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from "framer-motion";

import './GameStyles.scss'
import DynamicCard from './DynamicCard';

const CardGrid = (props) => {
    const { cards, type, handleCardSelection, resetCardSelection } = props;

    const renderTableCards = (keys) => {
        return (
            <AnimatePresence>
                {keys.map((key, index) => (
                    <motion.div
                        key={cards[key].key}
                        initial={false}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                    >
                        <DynamicCard
                            key={`card_${index}`}
                            cardKey={cards[key].key}
                            isFlipped={cards[key].isFlipped}
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
            <DynamicCard
                key={`card_${index}`}
                cardKey={cards[key].key}
                isFlipped={cards[key].isFlipped}
                handleCardSelection={handleCardSelection}
                resetCardSelection={resetCardSelection}
            />
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
    handleCardSelection: PropTypes.func,
    resetCardSelection: PropTypes.func,
};

export default CardGrid;