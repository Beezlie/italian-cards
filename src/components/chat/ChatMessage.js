import './ChatStyles.scss'

const ChatMessage = (props) => {
    
    const getMessageTitle = () => {
        const { username, lastMessage, message } = props;
        const isFirstMessageByUser = !lastMessage || lastMessage.username !== message.username;
        if (isFirstMessageByUser && username !== message.username && "system-message" !== message.classType) {
            return (
                <div className="chat-message-title">
                    {message.username}
                </div>
            );
        } else {
            return null;
        }
    };

    return (
        <div className="message-content">
            {getMessageTitle()}
            <div className="message-text">
                {props.message.text}
            </div>
        </div>
    );
};

export default ChatMessage;