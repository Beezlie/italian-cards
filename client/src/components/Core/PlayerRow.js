import PropTypes from 'prop-types';
import Button from 'react-uwp/Button';

import Player from './Player';

const PlayerRow = (props) => {
    const { username, isReady, handlePlayerReady } = props;

    return (
        <div className='player-row'>
            <Player/>
            <Button onClick={handlePlayerReady}>
                {isReady ? 'Ready' : 'Ready?'}
            </Button>
            <div>
                {username}
            </div>
        </div>
    );
};

Player.propTypes = {
    username: PropTypes.string,
    isReady: PropTypes.bool,
    handlePlayerReady: PropTypes.func,
};

export default PlayerRow;