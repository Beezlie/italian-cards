import PropTypes from 'prop-types';
import Button from 'react-uwp/Button';

import Player from './Player';

const PlayerRow = (props) => {
    const { userName, isReady, handlePlayerReady } = props;

    return (
        <div className='player-row'>
            <Player/>
            <Button onClick={handlePlayerReady}>
                {isReady ? 'Ready' : 'Ready?'}
            </Button>
            <div>
                {userName}
            </div>
        </div>
    );
};

Player.propTypes = {
    userName: PropTypes.string,
    isReady: PropTypes.bool,
    handlePlayerReady: PropTypes.func,
};

export default PlayerRow;