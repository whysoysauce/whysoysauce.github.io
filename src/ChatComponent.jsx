import React, { useState } from 'react';
import axios from "axios";

const API = 'http://35.95.27.32:5001/chat';

async function getChatGPTResponse(prompt) {
    try {
        const response = await axios.post(API, { prompt });
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("Error:", error);
        return "An error occurred. Please try again later.";
    }
}

function ChatComponent() {
    const [input, setInput] = useState('');
    const [chatLog, setChatLog] = useState([]);

    const handleSend = async () => {
        if (input.trim()) {
            // Add user input to chat log
            setChatLog([...chatLog, { sender: 'user', message: input }]);

            // Get response from ChatGPT
            const response = await getChatGPTResponse(input);
            setChatLog([...chatLog, { sender: 'user', message: input }, { sender: 'gpt', message: response }]);
            setInput(''); // Clear input after sending
        }
    };

    return (
        <div>
            <div>
                {chatLog.map((entry, index) => (
                    <p key={index}><strong>{entry.sender}:</strong> {entry.message}</p>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
}

export default ChatComponent;