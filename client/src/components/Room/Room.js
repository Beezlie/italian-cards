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
//Need concept of room host - only they can change settings and start the game
class Room extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isHost: false,
            players: [],
            gameOptions: [],
            selectedOptions: {
                maxTimerLimit: 30,
                gameType: '',
                maxPlayersLimit: 4,
            }
        };

        const { updateRoom, username } = this.props;
        subscribeTo.updateRoom((err, data) => {
            updateRoom(data);
            const isHost = data.players.some(player => player.isHost && player.username === username);
            this.setState(({ players }) => ({
                players: data.players,
                isHost: isHost,
            }));
        });
    }

    async componentDidMount() {
        const { selectedOptions } = this.state;
        try {
            const response = await axios.post(`${restUrl}/game/getGameOptions`);
            if (!response.data.success || !response) {
                //TODO - how to handle error?
                console.log("Unable to retrieve game options");
            } else {
                const gameOptions = response.data.result;
                let newSelectedOptions = {...selectedOptions};
                newSelectedOptions.gameType = gameOptions[0].key;
                this.setState(({ state }) => ({
                    gameOptions: gameOptions,
                    selectedOptions: newSelectedOptions,
                }));
            }
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

    renderGameOptions = () => {
        const { gameOptions, isHost, selectedOptions } = this.state;
        if (gameOptions.length) {
            let gameTypes = [];
            let numPlayerOptions = [];
            for (let i = 0; i < gameOptions.length; i++) {
                const gameOption = gameOptions[i];
                gameTypes.push(<option key={gameOption.key}>{gameOption.label}</option>);
                if (gameOption.key === selectedOptions.gameType) {
                    for (let j = 0; j < gameOption.numPlayerOptions.length; j++) {
                        numPlayerOptions.push(<option key={gameOption.key}>{gameOption.numPlayerOptions[j]}</option>);
                    }
                }
            }
            return (
                <div>
                    <h6>Game Type</h6>
                    <FormControl
                        as="select"
                        name="game-types"
                        onChange={this.handleDataChange}
                        disabled={!isHost}
                    >
                        {gameTypes}
                    </FormControl>
                    <br/>
                    <h6>Number of Players</h6>
                    <FormControl
                        as="select"
                        name="num-players"
                        onChange={this.handleDataChange}
                        disabled={!isHost}
                    >
                        {numPlayerOptions}
                    </FormControl> 
                </div>
            );
        }
    };

    render() {
        const { username, roomId, gameStarted } = this.props;
        const { selectedOptions } = this.state;
        
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
                        {this.renderGameOptions()}
                        <br/>
                        <h6>Turn Timer</h6>
                        <InputGroup>
                            <FormControl
                                disabled="true"
                                type="number"
                                placeholder={selectedOptions.maxTimerLimit}
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