import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactCardFlip from 'react-card-flip';

import Card from './Card';

const DynamicCard = (props) => {
    const { cardKey, isFlipped, isPlayerTurn, handleCardSelection, resetCardSelection } = props;
    const [isSelected, setIsSelected] = useState(false);
    const cardRef = useRef();

    const handleClickOutside = (e) => {
        if (e.target.className !== "card") {
            setIsSelected(false);
            resetCardSelection();
        }
    };

    const handleClickInside = (e) => {
        if (isPlayerTurn) {
            setIsSelected(true);
            handleCardSelection(cardKey);
        }
    };

    useEffect(() => {
        if (!isPlayerTurn) {
            setIsSelected(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isFlipped, isPlayerTurn, isSelected]);

    const getCardWrapperStyle = () => {
        let style = {};
        if (!isPlayerTurn) {
            style.opacity = 0.4;
            style.filter = 'alpha(opacity = 40)'; /* msie */
            style.backgroundColor = '#000';
        } else if (isSelected) {
            style.border = '5px solid #30fc03';
        }
        return style;
	}

    //TODO - use playerTurn for card selection highlighting and grey overlay when false
    return (
        <div>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div>
                    <Card
                        cardKey={"back"}
                    />
                </div>
                <div
                    className='card-wrapper'
                    style={getCardWrapperStyle()}
                    ref={cardRef}
                    onClick={handleClickInside}
                >
                    <Card
                        cardKey={cardKey}
                    />
                </div>
            </ReactCardFlip>
        </div>
    );
};

DynamicCard.propTypes = {
    cardKey: PropTypes.string,
    isFlipped: PropTypes.bool,
    isPlayerTurn: PropTypes.bool,
    handleCardSelection: PropTypes.func,
    resetCardSelection: PropTypes.func,
};

const mapStateToProps = function (state) {
    const { game } = state;
    return {
        isPlayerTurn: game.isPlayerTurn,
    };
};

export default connect(mapStateToProps)(DynamicCard);