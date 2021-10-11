import React from 'react';
import PropTypes from 'prop-types';

import './ChatStyles.scss'
import ChatMessageList from './ChatMessageList';
import { subscribeTo } from '../Socket/GameSubscriptions';

class ChatContainer extends React.Component {
    state = {
        messages: [],
    };

    static propTypes = {
        username: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);

        subscribeTo.updateChat((err, message) => {
            const { username } = this.props;
            const chatMessage = {
                classType: message.username === username ? "user-message" : "player-message",
                text: message.text,
                username: message.username,
            };

            this.setState(state => ({
                messages: [...state.messages, chatMessage],
            }));
        });

        subscribeTo.playerConnected((err, username) => {
            const chatMessage = {
                classType: "system-message",
                text: `${username} joined the game`,
                username: "system",
            };

            this.setState(state => ({
                messages: [...state.messages, chatMessage],
            }));
        });
    }

    //TODO - maybe get currentUserName from redux store instead of passing as prop?
    render() {
        const { messages } = this.state;
        const { username } = this.props;

        return (
            <div className="chat-container">
                <ChatMessageList
                    username={username}
                    messages={messages}
                />
            </div>
        );
    }
}

export default ChatContainer;