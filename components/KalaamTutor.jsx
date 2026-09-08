'use client';
import { useState } from 'react';

export default function KalaamTutor() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [track, setTrack] = useState('Spoken');

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    const res = await fetch('/api/tutor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input, track, language: 'Hinglish' }),
    });
    const data = await res.json();
    setMessages([...newMessages, { sender: 'ai', text: data.reply }]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Quick Kalaam AI Tutor</h2>
      <select value={track} onChange={(e) => setTrack(e.target.value)}>
        <option value="Spoken">Spoken Arabic</option>
        <option value="Written">Written Canvas</option>
        <option value="Quranic">Quranic Tajweed</option>
      </select>
      <div style={{ margin: '20px 0', minHeight: '200px', border: '1px solid #ccc', padding: '10px' }}>
        {messages.map((m, i) => (
          <p key={i}><strong>{m.sender === 'user' ? 'Aap' : 'Kalaam AI'}:</strong> {m.text}</p>
        ))}
      </div>
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Apna sawal likhein..." 
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
