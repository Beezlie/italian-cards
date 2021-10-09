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
            style.float = 'right';
            style.marginRight = '5px';
        } else {
            style.float = 'left';
            style.marginLeft = '5px';
        }
        return style;
    };

    return (
        <div style={ getContainerStyles(isFirstMessageByUser, username, message.username) }>
            <div className="chat-message-title">
                {messageTitle}
            </div>
            <div className="chat-message">
                <div className={username === message.username ? 'user-chat-message' : 'player-chat-message'}>
                    {message.text}
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;