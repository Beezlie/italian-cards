import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import Button from 'react-uwp/Button';

// TODO: Add Successfull creation of room authSuccess -> true
export default class Create extends React.Component {
    state = {
        action: 'create',
        roomId: '',
        password: '',
        options: {
            maxTimerLimit: 120 * 1000,
            maxPlayersLimit: 14
        }
    };

    static propTypes = {
        changeAuth: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.roomIdInput.focus();
        this.getNewRoomId();
    }

    handleDataChange = event => {
        if (event.target.name === 'password') {
            const password = event.target.value;
            this.setState({ password });
        }
        if (event.target.name === 'max-timer-limit') {
            const maxTimerLimit = Number(event.target.value) * 1000;
            if (maxTimerLimit > 0 && typeof maxTimerLimit === 'number') {
                this.setState(prevState => ({
                    options: { ...prevState.options, maxTimerLimit }
                }));
            }
        }
        if (event.target.name === 'max-players-limit') {
            const maxPlayersLimit = Number(event.target.value);
            if (maxPlayersLimit > 0 && typeof maxPlayersLimit === 'number') {
                this.setState(prevState => ({
                    options: { ...prevState.options, maxPlayersLimit }
                }));
            }
        }
    };

    handleSubmit = event => {
        event.preventDefault();
        const { changeAuth } = this.props;
        const { roomId, password, action, options } = this.state;
        changeAuth({ roomId, password, action, options });
    };

    getNewRoomId = () => {
        const { roomId } = this.state;
        if (!roomId) {
            const newRoomId = generateRoomId(5);
            this.setState({ roomId: newRoomId });
        }
    };

    render() {
        const { roomId } = this.state;

        return (
            <div>
                <h2>Create New Room</h2>
                <Form onSubmit={this.handleSubmit}>
                    <InputGroup>
                        <FormControl
                            readOnly
                            name="roomId"
                            value={roomId}
                            aria-label="roomId"
                            aria-describedby="text"
                        />
                    </InputGroup>
                    <br/>
                    <h6>Add password to keep it exclusive</h6>
                    <InputGroup>
                        <FormControl
                            ref={input => {
                                this.roomIdInput = input;
                            }}
                            placeholder="Optional: Enter room password"
                            name="password"
                            aria-label="password"
                            aria-describedby="password"
                            onChange={this.handleDataChange}
                        />
                    </InputGroup>
                    <br/>
                    <InputGroup>
                        <InputGroup.Append>
                            <Button variant="light" type="submit">
                                Create
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
            </div>
        );
    }
}

function generateRoomId(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}