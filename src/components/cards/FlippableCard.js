import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactCardFlip from 'react-card-flip';

import Card from './Card';

const FlippableCard = (props) => {
    const { cardKey } = props;
    const [isFlipped, setIsFlipped] = useState(false)
    
    const handleClick = (e) => {
        //e.target.className = "card-selected";
        if (!isFlipped) {
            setIsFlipped(true);
		}
    };

    useEffect(() => {
        console.log(isFlipped);
    }, [isFlipped]);

    return (
        <div>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <Card
                    cardKey={'back'}
                    handleClick={handleClick}
                />
                <Card
                    cardKey={cardKey}
                    handleClick={handleClick}
                />
            </ReactCardFlip>
        </div>
    );
};

FlippableCard.propTypes = {
    cardKey: PropTypes.string,
};

export default FlippableCard;