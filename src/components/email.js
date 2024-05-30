import React, { useState } from 'react';
import axios from 'axios';

function EmailUs() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [mess, setMess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/send-email', {
        to: email,
        subject,
        message,
      });
      setMess('Email sent successfully');
    } catch (error) {
      setMess('Error sending email:' + error.message);
    }
  };

  return (
    <div className="component">
      <div>
        <h3>Send Email</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Subject:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Message:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit">Send</button>
        </form>
        <div>{mess}</div>
      </div>
    </div>
  );
}

export default EmailUs;
