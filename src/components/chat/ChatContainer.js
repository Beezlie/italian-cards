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
            messages: [],
        };

        subscribeTo.updateChat((err, message) => {
            const { username } = this.props;
            //TODO - maybe server should only send to the others users (exclude user who sent msg)
            if (message.username !== username) {
                this._recieveMessage(message.text);
			}
        });
    }

    _onMessageWasSent(message) {
        emit.sendChatMessage(message.data.text);
        this.setState({
            messages: [...this.state.messages, message]
        })
    }

    _recieveMessage(text) {
        if (text.length > 0) {
            this.setState({
                messages: [...this.state.messages, {
                    author: 'them',
                    type: 'text',
                    data: { text }
                }]
            })
        }
    }

    render() {
        return (<div>
            <Launcher
                agentProfile={{
                    teamName: 'react-chat-window',
                    imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                }}
                onMessageWasSent={this._onMessageWasSent.bind(this)}
                messageList={this.state.messages}
                showEmoji
            />
        </div>)
    }
}

ChatContainer.propTypes = {
    username: PropTypes.string.isRequired,
};

export default ChatContainer;