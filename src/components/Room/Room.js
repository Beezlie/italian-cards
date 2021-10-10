import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import HyperLink from 'react-uwp/HyperLink';

import ErrorHandler from '../ErrorHandler';
import Welcome from './Room.Welcome';
import JoinRoom from './Room.Join';
import CreateRoom from './Room.Create';
import { SocketInit } from '../Socket/Socket';
import { initListeners } from '../Socket/InitListeners';
import { addRoomId, addPassword, addOptions } from '../../store/actions/RoomActions';
import { emit } from '../Socket/GameEmitters';

export let socket = undefined;

class Room extends React.Component {
    state = {
        action: 'join',
        error: ''
    };

    static propTypes = {
        username: PropTypes.string.isRequired,
        roomId: PropTypes.string.isRequired
    };

    handleAuth = data => {
        const { username } = this.props;
        const { action } = this.state;
        const { roomId, password, options } = data;
        // options -> only when action === 'create'
        socket = SocketInit(username, roomId, password, action, options);
        initListeners(this, socket);
    };

    resetError = () => {
        this.setState({ error: '' });
    };

    render() {
        const { action, error } = this.state;
        const { roomId } = this.props;

        if (error) {
            emit.closeConnection();
            return <ErrorHandler redirectUrl="/" error={error} resetError={this.resetError} />;
        }

        if (!roomId) {
            return (
                <div className="p-3">
                    <Welcome />
                    <hr />
                    <Row>
                        <Col>{action === 'join' && <JoinRoom changeAuth={this.handleAuth} />}</Col>
                        <Col>
                            {action === 'create' && <CreateRoom changeAuth={this.handleAuth} />}
                        </Col>
                    </Row>
                    <br />
                    <HyperLink
                        onClick={() => {
                            this.setState(prevState => ({
                                action: prevState.action === 'join' ? 'create' : 'join'
                            }));
                        }}
                    >
                        {`${action === 'join' ? 'Create New' : 'Join'} Room`}
                    </HyperLink>
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

export default connect(mapStateToProps, mapDispatchToProps)(Room);