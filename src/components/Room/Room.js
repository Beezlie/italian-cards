import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-uwp/Button';

import { emit } from '../Socket/GameEmitters';
import { subscribeTo } from '../Socket/GameSubscriptions';
import { updateRoom } from '../../store/actions/RoomActions';
import ChatContainer from '../chat/ChatContainer';
import PlayerRow from '../Core/PlayerRow';

//TODO
//-players, player pics, ready button on left side
//-can have default empty player slots. Fills in when a player joins or can be set to CPU. Number slots changes with game options
//Make an API call to get the available games options (then these are filled in as picklists)
//Once they choose a game, make an API call to get the specific options for that game
//Default options for every game: number players
//-game options and rules on right side
//-chat messages persist between room and game
class Room extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            players: [],
        };
        const { updateRoom } = this.props;

        subscribeTo.updateRoom((err, data) => {
            updateRoom(data);
            this.setState(({ players }) => ({
                players: data.players,
            }));
        });
    }

    handlePlayerReady = () => {
        const { username } = this.props;
        emit.playerReady(username);
        this.setState(({ players }) => {
            const updatedPlayers = players.map(player => player.name === username ? {...player, isReady: true} : player);
            return {
                players: updatedPlayers
            };
        });
    };

    handleStartGame = () => {
        const { players } = this.state;
        const nonReadyPlayers = players.filter(player => !player.isReady);
        if (nonReadyPlayers.length === 0) {
            emit.startGame({});
        }
    };

    renderPlayers = () => {
        const { players } = this.state;

        var playerRows = [];
        for (let i = 0; i < players.length; i++) {
            playerRows.push(
                <div key={`player_${i}`}>
                    <PlayerRow
                        username={players[i].name}
                        isReady={players[i].isReady}
                        handlePlayerReady={this.handlePlayerReady}
                    />
                </div>
            );
        }
        return (
            <div className='player-rows'>
                {playerRows}
            </div>
        );
    };

    render() {
        const { username, roomId, gameStarted } = this.props;
        
        if (gameStarted) {
            return (
                <Redirect
                    push 
                    to={{
                        pathname: '/game',
                        search: `?=${roomId}`,
                        state: { referrer: '/room' }
                    }}
                />
            );
        }    

        return (
            <div className="p-3">
                <Row>
                    <Col>
                        {this.renderPlayers()}
                        <Button className='start-button' onClick={this.handleStartGame}>
                            Start Game
                        </Button>
                        </Col>
                    <Col>
                        <Button>
                            Test
                        </Button>
                    </Col>
                    <ChatContainer
                        username={username}
                    />
                </Row>
            </div>
        );
    }
}

Room.propTypes = {
    username: PropTypes.string.isRequired,
    roomId: PropTypes.string.isRequired,
    gameStarted: PropTypes.bool,
    updateRoom: PropTypes.func,
}

const mapStateToProps = function (state) {
    const { user, room } = state;
    return {
        username: user.username,
        roomId: room.roomId,
        password: room.password,
        gameStarted: room.gameStarted,
    };
};

const mapDispatchToProps = dispatch => ({
    updateRoom: data => dispatch(updateRoom(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);