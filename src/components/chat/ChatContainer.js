import React from 'react';
import PropTypes from 'prop-types';

import './styles';
import Launcher from './Launcher';
import { emit } from '../Socket/GameEmitters';
import { subscribeTo } from '../Socket/GameSubscriptions';

class ChatContainer extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            chatOpen: false,
            messages: [],
            newMessagesCount: 0,
        };

        subscribeTo.updateChat((err, message) => {
            const { username } = this.props;
            //TODO - maybe server should only send to the others users (exclude user who sent msg)
            if (message.username !== username) {
                this._recieveMessage(message);
			}
        });
    }

    _onMessageWasSent(message) {
        emit.sendChatMessage(message);
        this.setState({
            messages: [...this.state.messages, message]
        });
    }

    _recieveMessage(message) {
        this.setState({
            messages: [...this.state.messages, {
                author: 'them',
                type: message.type,
                data: message.data,
            }],
            newMessagesCount: this.state.newMessagesCount + 1
        });
    }

    _handleClick() {
        if (this.state.chatOpen) {
            this.setState({
                chatOpen: false
            });
        } else {
            this.setState({
                chatOpen: true,
                newMessagesCount: 0
            });
		}
	}

    render() {
        return (<div>
            <Launcher
                agentProfile={{
                    teamName: 'Game Chat',
                    imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                }}
                handleClick={this._handleClick.bind(this)}
                isOpen={this.state.chatOpen}
                onMessageWasSent={this._onMessageWasSent.bind(this)}
                messageList={this.state.messages}
                newMessagesCount={this.state.newMessagesCount}
                showEmoji
            />
        </div>)
    }
}

ChatContainer.propTypes = {
    username: PropTypes.string.isRequired,
};

export default ChatContainer;