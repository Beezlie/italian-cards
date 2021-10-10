import PropTypes from 'prop-types';

import cardSpritesFile from '../../assets/images/card_sprites.png';

const Card = ({ x, y, width, height }) => {

    const style = {
        backgroundImage: `url(${cardSpritesFile})`,
        backgroundPosition: `${x * (-1)}px ${y * (-1)}px`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '700px',
        width,
        height,
    };

    return (
        <div className="card" style={style}>
            
        </div>
    );
};

Card.propTypes = {
    filename: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
};

export default Card;