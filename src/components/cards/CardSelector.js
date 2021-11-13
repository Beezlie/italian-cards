import { useEffect } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const CardSelector = (props) => {
    const { cardKey, cardSelection, handleCardSelection, resetCardSelection, isPlayerTurn } = props;

    const handleClickOutside = (e) => {
        if (e.target.className !== "card") {
            resetCardSelection();
        }
    };

    const handleClickInside = (e) => {
        if (isPlayerTurn) {
            handleCardSelection(cardKey);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getStyle = () => {
        let style = {};
        const isSelected = cardSelection.filter(card => card.key === cardKey).length !== 0;
        if (isSelected) {
            style.border = '5px solid #30fc03';
        } else if (!isPlayerTurn) {
            style.opacity = 0.4;
            style.filter = 'alpha(opacity = 40)'; /* msie */
            style.backgroundColor = '#000';
        }
        return style;
    }

    return (
        <div
            className='card-selector'
            style={getStyle()}
            onClick={handleClickInside}
        >
            {props.children}
        </div>
    );
};

CardSelector.propTypes = {
    isPlayerTurn: PropTypes.bool,
    cardSelection: PropTypes.array,
    handleCardSelection: PropTypes.func,
    resetCardSelection: PropTypes.func,
};

const mapStateToProps = function (state) {
    const { game } = state;
    return {
        isPlayerTurn: game.isPlayerTurn,
    };
};

export default connect(mapStateToProps)(CardSelector);