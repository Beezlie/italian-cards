import PropTypes from 'prop-types';

import getItalianCardSpriteStyle from './CardSpriteMappingUtil';

const Card = (props) => {
    const { cardKey } = props;

    const handleClick = (e) => {
        e.target.className = "card-selected";
    };

    return (
        <div
            className="card"
            style={getItalianCardSpriteStyle(cardKey)}
            onClick={handleClick}
        />
    );
};

Card.propTypes = {
    cardKey: PropTypes.string,
};

export default Card;