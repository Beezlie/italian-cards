import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Navbar, Form, Button } from 'react-bootstrap';
import logo from '../logo.svg';

class Nav extends React.Component {
    static contextTypes = { theme: PropTypes.object };

    static propTypes = {
        username: PropTypes.string.isRequired,
    };

    getNavDynamicContent = () => {
        return (
            <Navbar.Collapse className="container-fluid">
                <this.getRoomDetails/>
                <this.getLoginContent/>
            </Navbar.Collapse>
        );
    };

    getRoomDetails = () => {
        const { roomId, password } = this.props;
        if (roomId) {
            return (
                <Navbar.Text className="ml-auto">
                    ROOM ID: {roomId} - PASSWORD: <b>{password || 'none'}</b>{' '}
                </Navbar.Text>
            );
        } else {
            return null;
        }
    }

    getLoginContent = () => {
        const username = this.props.username;
        if (username) {
            return (
                <Navbar.Text className="border-left pl-2 ml-auto">
                    Signed in as: <b>{username}</b>
                </Navbar.Text>
            );
        } else {
            return (
                <Form inline className="border-left pl-2 ml-auto">
                    <Button variant="outline-primary">Login</Button>
                </Form>
            );
        }
    };

    render() {
        const { theme } = this.context;
        return (
            <Navbar variant="dark" style={{ background: theme.useFluentDesign ? theme.acrylicTexture80.background : 'none' }}>
                <Navbar.Brand href="/">
                    <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="logo" /> Scopa!
                </Navbar.Brand>
                <this.getNavDynamicContent/>
            </Navbar>
        );
    }
}

const mapStateToProps = function (state) {
    const { user, room } = state;
    return {
        loggedIn: user.loggedIn,
        username: user.username,
        roomId: room.roomId,
        password: room.password,
    };
};

export default connect(mapStateToProps)(Nav);