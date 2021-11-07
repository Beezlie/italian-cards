import { useState } from 'react';
import Button from 'react-uwp/Button';

import { emit } from '../Socket/GameEmitters';

const PlayerReadyButton = (props) => {
    const [ready,setValue] = useState(false);

    const handleClick = (e) => {
        const { username } = props;
        emit.playerReady(username);
        setValue(true);
    };

    const getButtonText = () => {
        return ready ? 'Player Ready' : 'Ready?';
    };

    return (
        <Button
            className="player-ready-button"
            onClick={handleClick}
        >
            {getButtonText()}
        </Button>
    );
}

export default PlayerReadyButton;