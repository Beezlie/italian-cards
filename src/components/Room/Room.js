import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Row, Col, FormControl, InputGroup } from 'react-bootstrap';
import Button from 'react-uwp/Button';
import axios from 'axios';

import { emit } from '../Socket/GameEmitters';
import { subscribeTo } from '../Socket/GameSubscriptions';
import { updateRoom } from '../../store/actions/RoomActions';
import ChatContainer from '../chat/ChatContainer';
import PlayerRow from '../Core/PlayerRow';
import { restUrl } from '../../env';
import './RoomStyles.scss'

//TODO
//-can have default empty player slots. Fills in when a player joins or can be set to CPU. Number slots changes with game options
//Once they choose a game, make an API call to get the specific options for that game
//-chat messages persist between room and game
class Room extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            players: [],
            options: {
                maxTimerLimit: 30,
                maxPlayersLimit: 4
            }
        };
        const { updateRoom } = this.props;

        subscribeTo.updateRoom((err, data) => {
            updateRoom(data);
            this.setState(({ players }) => ({
                players: data.players,
            }));
        });
    }

    async componentDidMount() {
        const { options } = this.state;
        try {
            const response = await axios.post(`${restUrl}/game/getGameTypes`);
            if (!response.data.success || !response) {
                //TODO - how to handle error?
                console.log("Unable to retrieve game types");
            }
            let newOptions = {...options};
            newOptions.gameTypes = response.data.result;
            this.setState(({ options }) => ({
                options: newOptions,
            }));
        } catch (error) {
            console.log(error.message);
            //TODO - how to handle error?
        }
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
        let playerRows = [];
        for (let i = 0; i < players.length; i++) {
            playerRows.push(
                <div key={`player_${i}`}>
                    <PlayerRow
                        username={players[i].username}
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

    renderGameTypes = () => {
        const { options } = this.state;
        let gameTypes = [];
        if (options.gameTypes) {
            for (let i = 0; i < options.gameTypes.length; i++) {
                gameTypes.push(
                    <option key={i}>{options.gameTypes[i].label}</option>
                );
            }
            return (
                <FormControl
                    as="select"
                    name="game-types"
                    onChange={this.handleDataChange}
                >
                    {gameTypes}
                </FormControl>
            );
        }
    };

    render() {
        const { username, roomId, gameStarted } = this.props;
        const { options } = this.state;
        
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
                    </Col>
                    <Col>
                        <h4>Game Settings</h4>
                        <br/>
                        <h6>Game Type</h6>
                        {this.renderGameTypes()}
                        <br/>
                        <h6>Number of Players</h6>
                        <FormControl
                            type="number"
                            placeholder={options.maxPlayersLimit}
                            name="num-players"
                            aria-label="num-players"
                            aria-describedby="num-players"
                            onChange={this.handleDataChange}
                        />
                        <br/>
                        <h6>Turn Timer</h6>
                        <InputGroup>
                            <FormControl
                                disabled="true"
                                type="number"
                                placeholder={options.maxTimerLimit}
                                name="max-timer-limit"
                                aria-label="max-timer-limit"
                                aria-describedby="max-timer-limit"
                                onChange={this.handleDataChange}
                            />
                            <InputGroup.Append>
                                <InputGroup.Text id="time-prefiz">seconds</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                        <br />
                        <Button className='start-button' onClick={this.handleStartGame}>
                            Start Game
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