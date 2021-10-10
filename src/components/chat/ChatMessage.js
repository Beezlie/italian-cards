import './ChatStyles.scss'

const ChatMessage = ({ username, lastMessage, message }) => {
    const isFirstMessageByUser = !lastMessage || lastMessage.username !== message.username;
    let messageTitle = null;
    if (isFirstMessageByUser && username !== message.username) {
        messageTitle = message.username;
    }

    const getContainerStyles = (isFirstMessageByUser, username, messageUsername) => {
        let style = {
            marginTop: isFirstMessageByUser? '8px': '0px'
        };
        if (username === messageUsername) {
            style.marginRight = '0';
            style.marginLeft = 'auto';
        } else {
            style.marginRight = 'auto';
            style.marginLeft = '0';
        }
        return style;
    };

    return (
        <div className="message-content">
            <div className="chat-message-title">
                {messageTitle}
            </div>
            <div className="message-text">
                {message.text}
            </div>
        </div>
    );
};

export default ChatMessage;