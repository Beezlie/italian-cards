import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import Toast from 'react-uwp/Toast';

import './CoreStyles.scss'
import ChatContainer from '../chat/ChatContainer';
import CardContainer from '../cards/CardContainer';
import CardDeck from '../cards/CardDeck';
import ScoreModal from './ScoreModal';
import Player from './Player';

class Game extends React.Component {

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
    //TODO - this should be called from the lobby once all the users are ready so it should pass in the player list
    render() {
        const { username, roomId, deckCount } = this.props;
        const { theme } = this.context;

        if (!roomId) {
            return <Redirect to="/" />;
        }

        return (
            <Row className="game no-gutters">
                <ScoreModal />
                <Col className="side-panel">
                    <Player
                        username={username}
                    />
                    <CardDeck
                        numCardsInDeck={deckCount}
                    />
                </Col>
                <Row className="main-panel">
                    <div className="top-panel">
                        <Player
                            username={username}
                        />
                    </div>
                    <CardContainer
                        style={{
                            background: theme.useFluentDesign ? theme.acrylicTexture80.background : 'none'
                        }}
                    />
                </Row>
                <Col className="side-panel">
                    <Player
                        username={username}
                    />
                    <ChatContainer
                        username={username}
                    />
                </Col>
            </Row>
        );
    }
}

Game.propTypes = {
    username: PropTypes.string.isRequired,
    roomId: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired,
    deckCount: PropTypes.number
}

const mapStateToProps = state => {
    const { user, room, game } = state;
    return {
        username: user.username,
        roomId: room.roomId,
        password: room.password,
        options: room.options,
        deckCount: game.deckCount
    };
};

export default connect(mapStateToProps)(Game);