import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ChatWindow from './ChatWindow';
import launcherIcon from './../../assets/images/logo-no-bg.svg';
import incomingMessageSound from './../../assets/sounds/notification.mp3';
import launcherIconActive from './../../assets/images/close-icon.png';

class Launcher extends Component {

    constructor() {
        super();
        this.state = {
            launcherIcon,
            isOpen: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.mute) { return; }
        const nextMessage = nextProps.messageList[nextProps.messageList.length - 1];
        const isIncoming = (nextMessage || {}).author === 'them';
        const isNew = nextProps.messageList.length > this.props.messageList.length;
        if (isIncoming && isNew) {
            this.playIncomingMessageSound();
        }
    }

    playIncomingMessageSound() {
        var audio = new Audio(incomingMessageSound);
        audio.play();
    }

    render() {
        const isOpen = this.props.hasOwnProperty('isOpen') ? this.props.isOpen : this.state.isOpen;
        const classList = [
            'sc-launcher',
            (isOpen ? 'opened' : ''),
        ];
        return (
            <div id="sc-launcher">
                <div className={classList.join(' ')} onClick={this.props.handleClick.bind(this)}>
                    <MessageCount count={this.props.newMessagesCount} isOpen={isOpen} />
                    <img className={'sc-open-icon'} src={launcherIconActive} />
                    <img className={'sc-closed-icon'} src={launcherIcon} />
                </div>
                <ChatWindow
                    messageList={this.props.messageList}
                    onUserInputSubmit={this.props.onMessageWasSent}
                    agentProfile={this.props.agentProfile}
                    isOpen={isOpen}
                    onClose={this.props.handleClick.bind(this)}
                    showEmoji={this.props.showEmoji}
                />
            </div>
        );
    }
}

const MessageCount = (props) => {
    if (props.count === 0 || props.isOpen === true) { return null; }
    return (
        <div className={'sc-new-messages-count'}>
            {props.count}
        </div>
    );
};

Launcher.propTypes = {
    onMessageWasSent: PropTypes.func,
    newMessagesCount: PropTypes.number,
    isOpen: PropTypes.bool,
    handleClick: PropTypes.func,
    messageList: PropTypes.arrayOf(PropTypes.object),
    mute: PropTypes.bool,
    showEmoji: PropTypes.bool,
};

Launcher.defaultProps = {
    newMessagesCount: 0,
    showEmoji: true
};

export default Launcher;