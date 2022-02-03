import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import ErrorHandler from '../ErrorHandler';
import JoinRoom from './JoinRoom';
import CreateRoom from './CreateRoom';
import { SocketInit } from '../Socket/Socket';
import { initListeners } from '../Socket/InitListeners';
import { addRoomId, addPassword, addOptions } from '../../store/actions/RoomActions';
import { emit } from '../Socket/GameEmitters';

export let socket = undefined;

class RoomLauncher extends React.Component {
    state = {
        error: ''
    };

    static propTypes = {
        username: PropTypes.string.isRequired,
        roomId: PropTypes.string.isRequired
    };

    handleAuth = data => {
        const { username } = this.props;
        const { roomId, password, action, options } = data;
        // options -> only when action === 'create'
        socket = SocketInit(username, roomId, password, action, options);
        initListeners(this, socket);
    };

    resetError = () => {
        this.setState({ error: '' });
    };

    render() {
        const { error } = this.state;
        const { roomId } = this.props;

        if (error) {
            emit.closeConnection();
            return <ErrorHandler redirectUrl="/" error={error} resetError={this.resetError} />;
        }

        if (!roomId) {
            return (
                <div className="p-3">
                    <Row>
                        <Col>
                            <JoinRoom changeAuth={this.handleAuth} />
                        </Col>
                        <Col>
                            <CreateRoom changeAuth={this.handleAuth} />
                        </Col>
                    </Row>
                    <br />
                </div>
            );
        }

        return (
            <Redirect
                push 
                to={{
                    pathname: '/room',
                    search: `?=${roomId}`,
                    state: { referrer: '/' }
                }}
            />
        );
    }
}

const mapStateToProps = function (state) {
    const { user, room } = state;
    return {
        username: user.username,
        roomId: room.roomId,
        password: room.password,
        options: room.options
    };
};

const mapDispatchToProps = dispatch => ({
    addRoomId: roomId => dispatch(addRoomId({ roomId })),
    addPassword: password => dispatch(addPassword({ password })),
    addOptions: options => dispatch(addOptions({ options }))
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomLauncher);