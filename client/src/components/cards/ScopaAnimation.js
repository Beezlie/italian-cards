import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import scopaAudioEffect from './../../assets/sounds/fast-success-audio-effect.wav';

const ScopaAnimation = (props) => {
    const { tableCards, gameStarted } = props;
    const { width, height } = useWindowSize();
    if (tableCards.length === 0 && gameStarted) {
        let audio = new Audio(scopaAudioEffect);
        audio.play();
        return (
            <Confetti
                width={width}
                height={height}
            />
        );
    } else {
        return null;
	}
}

ScopaAnimation.propTypes = {
    tableCards: PropTypes.array,
    gameStarted: PropTypes.bool,
};

const mapStateToProps = function (state) {
    const { room } = state;
    return {
        gameStarted: room.gameStarted,
    };
};

export default connect(mapStateToProps)(ScopaAnimation);