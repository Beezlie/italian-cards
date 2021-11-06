import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import Toast from 'react-uwp/Toast';

import './CoreStyles.scss'
import ChatContainer from '../chat/ChatContainer';
import PlayerReadyButton from '../gameDetails/PlayerReadyButton';
import { emit } from '../Socket/GameEmitters';
import { subscribeTo } from '../Socket/GameSubscriptions';
import CardContainer from '../cards/CardContainer';
import ScoreBoard from '../gameDetails/ScoreBoard';
import ScoreModal from './ScoreModal';

class Lobby extends React.Component {

    static contextTypes = { theme: PropTypes.object };

    constructor(props) {
        super(props);
        this.state = {
            warning: [true, '', ''],
            isReady: false,
            isTurn: false,
            currentUsername: ''
        };
    }

    setStates = states => {
        return states.forEach(state => {
            this.setState({ ...state });
        });
    };

    showWarning = warning => {
        return (
            <Toast
                showCloseIcon
                closeDelay={10000}
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
        const { username, roomId, options } = this.props;
        const { currentUsername, isTurn, warning } = this.state;
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
                    <ScoreModal/>
                </div>
            </Row>
        );
    }
}

Lobby.propTypes = {
    roomId: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired,
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