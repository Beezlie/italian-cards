import { useState, useEffect } from 'react';

import './ChatStyles.scss'
import { emit } from '../Socket/game.Emitters';

const ChatInput = () => {
    const [value, setValue] = useState('');

    useEffect(() => {
        const sendMessage = () => {
            const text = value.trim();
            if (text.length > 0) {
                emit.sendChatMessage(text);
                setValue('');
            }
        };
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                event.preventDefault();
                sendMessage();
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [value]);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <textarea
            className="chat-message-input"
            placeholder="Send a message..."
            value={value}
            onChange={handleChange}
        />
    );
}

export default ChatInput;