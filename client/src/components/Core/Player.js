import PropTypes from 'prop-types';
import missingPlayerPhotoUrl from './../../assets/images/no_user_photo.png';

const Player = (props) => {
    const { userName } = props;

    return (
        <div
            className="player"
            style={{ backgroundImage: `url(${missingPlayerPhotoUrl})` }}
        />
    );
};

Player.propTypes = {
    userName: PropTypes.string,
};

export default Player;