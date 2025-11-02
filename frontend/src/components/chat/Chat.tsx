import './chat.css';
import { Message } from '../message';
import { socket } from '../../socket';
import { useState } from 'react';

export type ChatProps = {
  messages: string[];
};

export function Chat({ messages }: ChatProps) {
  const [value, setValue] = useState('');

  return (
    <div className="chat">
      {messages.map((message, index) => (
        <Message message={message} key={index} />
      ))}
      <form
        className="message-form"
        onSubmit={(e) => {
          e.preventDefault();
          setValue('');
          e.currentTarget.reset();
          socket.emit('message', value);
        }}
      >
        <input onChange={(e) => setValue(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
