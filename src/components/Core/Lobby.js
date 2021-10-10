import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-uwp/Button';
import Toast from 'react-uwp/Toast';

import GroupChat from '../chat/ChatContainer';
import { emit } from '../Socket/GameEmitters';
import TurnTimer from './TurnTimer';
import GameContainer from '../game/GameContainer';

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

    render() {
        const { username, roomId, password, options } = this.props;
        const { currentUsername, isTurn } = this.state;
        const { theme } = this.context;

        if (!roomId) {
            return <Redirect to="/" />;
        }

        return (
            <Row className="mh-100 no-gutters">
                <Col
                    style={{
                        background: theme.useFluentDesign ? theme.acrylicTexture80.background : 'none'
                    }}
                >
                    <GameContainer/>
                </Col>
                <Col lg={3} md={6}>
                    <GroupChat
                        username={username}
                        setParentStates={this.setStates}
                    />
                    <br />
                    <h4>
                        PASSWORD - <b>{password || 'none'}</b>{' '}
                    </h4>
                    <br />
                    {isTurn && (
                        <TurnTimer
                            isTurn={isTurn}
                            currentUserName={currentUsername}
                            duration={options.maxTimerLimit || 10}
                        />
                    )}
                </Col>
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