import { useRef, useEffect } from 'react';

import './ChatStyles.scss'
import ChatMessage from './ChatMessage';

const ChatMessageList = (props) => {
    const { username, messages } = props;

    const renderMessages = () => {
        const keys = Object.keys(messages);

        return keys.map((key, index) => {
            const message = messages[key];
            const lastMessageKey = index === 0 ? null : keys[index - 1];
            const userTypeClass = username === message.username ? "user-message" : "player-message";

            return (
                <div className={`message-row ${userTypeClass}`} key={`msg_${index}`}>
                    <ChatMessage
                        username={username}
                        message={message}
                        lastMessage={messages[lastMessageKey]}
                    />
                </div>
            );
        });
    };

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    return(
        <div className="chat-message-list">
            {renderMessages()}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default ChatMessageList;