import './ChatStyles.scss'
import ChatMessage from './ChatMessage';

const ChatMessageList = (props) => {
    const { username, messages } = props;

    const renderMessages = () => {
        const keys = Object.keys(messages);

        return keys.map((key, index) => {
            const message = messages[key];
            const lastMessageKey = index === 0 ? null : keys[index - 1];

            return (
                <div key={`msg_${index}`}>
                    <ChatMessage
                        username={username}
                        message={message}
                        lastMessage={messages[lastMessageKey]}
                    />
                </div>
            );
        });
    };

    return(
        <div className="chat-message-list">
            {renderMessages()}
        </div>
    );
};

export default ChatMessageList;