import React from 'react';
import PropTypes from 'prop-types';

import './ChatStyles.scss'
import ChatInput from './ChatInput';
import ChatMessageList from './ChatMessageList';
import { subscribeTo } from '../Socket/game.Subscriptions';

class GroupChat extends React.Component {
    state = {
        messages: [],
    };

    static propTypes = {
        username: PropTypes.string.isRequired,
        setParentStates: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        subscribeTo.showPlayers((err, message) => {
            let convertedMsg = '';
            message.forEach(player => {
                convertedMsg += `${player.username} is ${player.isReady ? 'ready' : 'not ready'
                    } \n`;
            });
            const systemMsg = {
                position: 'right',
                notch: false,
                date: null,
                type: 'text',
                text: convertedMsg
            };
            this.setState(state => ({
                messages: [...state.messages, systemMsg]
            }));
            console.log(message);
        });

        subscribeTo.draftStart((err, message) => {
            const systemMsg = {
                position: 'right',
                notch: false,
                date: null,
                type: 'text',
                text: message
            };
            this.setState(state => ({ messages: [...state.messages, systemMsg] }));
            this.props.setParentStates([{ isDraftReady: true }]);

            console.log(message);
        });

        subscribeTo.playerCollections((err, message) => {
            this.props.setParentStates([{ allCollections: message }]);
            console.log(message);
        });

        subscribeTo.myTurnStart((err, message) => {
            const systemMsg = {
                position: 'right',
                notch: false,
                date: null,
                type: 'text',
                text: message
            };

            this.setState(state => ({ messages: [...state.messages, systemMsg] }));
            this.props.setParentStates([{ isTurn: true }]);
            console.log(message);
        });

        subscribeTo.playerTurnStart((err, message) => {
            const systemMsg = {
                position: 'right',
                notch: false,
                date: null,
                type: 'text',
                text: message
            };

            const currentUsername = message.replace(/ .*/, '');

            this.setState(state => ({ messages: [...state.messages, systemMsg] }));
            this.props.setParentStates([{ currentUsername }]);
            console.log(message);
        });

        subscribeTo.personalTurnEnd((err, message) => {
            const systemMsg = {
                position: 'right',
                notch: false,
                date: null,
                type: 'text',
                text: message
            };

            this.setState(state => ({ messages: [...state.messages, systemMsg] }));
            this.props.setParentStates([{ isTurn: false }]);
            console.log(message);
        });

        subscribeTo.playerTurnEnd((err, message) => {
            const systemMsg = {
                position: 'right',
                notch: false,
                date: null,
                type: 'text',
                text: message
            };

            this.setState(state => ({ messages: [...state.messages, systemMsg] }));
            console.log(message);
        });

        subscribeTo.draftEnd((err, message) => {
            const systemMsg = {
                position: 'right',
                notch: false,
                date: null,
                type: 'text',
                text: message
            };

            this.setState(state => ({ messages: [...state.messages, systemMsg] }));
            console.log(message);
        });

        //TODO - maybe move this to MessageList component
        subscribeTo.updateChat((err, message) => {
            this.setState(state => ({
                messages: [...state.messages, message],
            }));
            console.log(message.text);
        });
    }

    //TODO - maybe get currentUserName from redux store instead of passing as prop? idk
    render() {
        const { messages } = this.state;
        const { username } = this.props;

        return (
            <div>
                <div className="chat-container">
                    <ChatMessageList
                        username={username}
                        messages={messages}
                    />
                </div>
                <ChatInput />
            </div>
        );
    }
}

export default GroupChat;