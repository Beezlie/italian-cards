import PropTypes from 'prop-types';

import { getItalianCardSpriteStyle } from './CardUtil';

const Card = (props) => {
    const { cardKey } = props;

    return (
        <div
            className="card"
            style={getItalianCardSpriteStyle(cardKey)}
        />
    );
};

Card.propTypes = {
    cardKey: PropTypes.string,
};

export default Card;