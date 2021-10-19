import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactCardFlip from 'react-card-flip';

import Card from './Card';

const DynamicCard = (props) => {
    const { cardKey, isFlipped, handleCardSelection, resetCardSelection } = props;
    const [isSelected, setIsSelected] = useState(false);
    const cardRef = useRef();

    const handleClickOutside = (e) => {
        if (e.target.className !== "card") {
            setIsSelected(false);
            resetCardSelection();
        }
    };

    const handleClickInside = (e) => {
        setIsSelected(true);
        handleCardSelection(cardKey);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isFlipped, isSelected]);

    return (
        <div>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div className={isSelected ? "card-selected" : ""}>
                    <Card
                        cardKey={"back"}
                    />
                </div>
                <div
                    className={isSelected ? "card-selected" : ""}
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
    handleCardSelection: PropTypes.func,
    resetCardSelection: PropTypes.func,
};

export default DynamicCard;