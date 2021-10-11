import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import Toast from 'react-uwp/Toast';

import './CoreStyles.scss'
import ChatContainer from '../chat/ChatContainer';
import ChatInput from '../chat/ChatInput';
import PlayerReadyButton from '../gameDetails/PlayerReadyButton';
import { emit } from '../Socket/GameEmitters';
import TurnTimer from './TurnTimer';
import CardContainer from '../cards/CardContainer';
import ScoreBoard from '../gameDetails/ScoreBoard';

class Lobby extends React.Component {
    state = {
        warning: [true, '', ''],
        isReady: false,
        isTurn: false,
        currentUsername: ''
    };

    static contextTypes = { theme: PropTypes.object };

    static propTypes = {
        roomId: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        options: PropTypes.object.isRequired
    };

    setStates = states => {
        return states.forEach(state => {
            this.setState({ ...state });
        });
    };

    showWarning = warning => {
        return (
            <Toast
                showCloseIcon
                closeDelay={3000}
                defaultShow={warning[0]}
                title={warning[1]}
                description={warning[2]}
                onToggleShowToast={isToast => {
                    if (isToast) {
                        this.setState({ warning: [false, undefined, undefined] });
                    }
                }}
            />
        );
    };

    //TODO - use map state to props instead of passing username as prop
    render() {
        const { username, roomId, password, options } = this.props;
        const { currentUsername, isTurn } = this.state;
        const { theme } = this.context;

        if (!roomId) {
            return <Redirect to="/" />;
        }

        return (
            <Row className="lobby no-gutters">
                <div className="left-panel">
                    <ScoreBoard/>
                    <PlayerReadyButton
                        username={username}
                    />
                </div>
                <div className="main-panel"
                    style={{
                        background: theme.useFluentDesign ? theme.acrylicTexture80.background : 'none'
                    }}
                >
                    <CardContainer/>
                </div>
                <div className="right-panel">
                    <ChatContainer
                        username={username}
                    />
                    <div className="bottom-right-panel">
                        <ChatInput />
                        {isTurn && (
                            <TurnTimer
                                isTurn={isTurn}
                                currentUserName={currentUsername}
                                duration={options.maxTimerLimit || 10}
                            />
                        )}
                    </div>
                </div>
            </Row>
        );
    }
}

const mapStateToProps = state => {
    const { user, room } = state;
    return {
        username: user.username,
        roomId: room.roomId,
        password: room.password,
        options: room.options
    };
};

export default connect(mapStateToProps)(Lobby);