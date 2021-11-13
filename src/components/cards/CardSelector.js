import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const CardSelector = (props) => {
    const { cardKey, isSelectable, handleCardSelection, resetCardSelection, isPlayerTurn } = props;
    const [isSelected, setIsSelected] = useState(false);

    const handleClickOutside = (e) => {
        if (e.target.className !== "card") {
            setIsSelected(false);
            resetCardSelection();
        }
    };

    const handleClickInside = (e) => {
        if (isPlayerTurn && isSelectable) {
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
    }, [isPlayerTurn, isSelected]);

    const getStyle = () => {
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
    isSelectable: PropTypes.bool,
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