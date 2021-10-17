import PropTypes from 'prop-types';

import getItalianCardSpriteStyle from './CardSpriteMappingUtil';

const Card = (props) => {
    const { cardKey, handleClick } = props;

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