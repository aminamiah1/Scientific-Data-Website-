"use client"
import React, { useState } from 'react';

const Footer: React.FC = () => {
  const [messageStatus, setMessageStatus] = useState({ sent: false, error: false });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    
    if (!name || !email || !phone || !message) {
      console.error('All fields are required.');
      return; 
    }

    setMessageStatus({ sent: false, error: false });

    const formData = { name, email, phone, message };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Email sent successfully');
      setMessageStatus({ sent: true, error: false });

      
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error) {
      console.error('Error in sending email:', error);
      setMessageStatus({ sent: false, error: true });
    }
  }

  return (
    <footer className="w-full bg-gray-100 py-8 dark:bg-slate-600">
      <div className="max-w-screen-xl mx-auto px-10 md:px-32">
        <div className="flex justify-center items-center">
          <form onSubmit={handleOnSubmit} className="relative container max-w-4xl bg-white bg-opacity-80 rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-xl">
            <div className="col-span-2">
              <h2 className="text-2xl font-bold text-center mb-6">Contact Us!</h2>
            </div>
            <div className="space-y-4">
              <input
                id="frm-name"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="given-name"
                required
                placeholder="Name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                id="frm-email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                id="frm-phone"
                type="text"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                required
                placeholder="Phone"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-4">
              <textarea
                id="frm-message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Message"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <div className="bg-hand-bg absolute right-5 bottom-5 h-48 w-48 bg-no-repeat bg-contain"></div>
            <div className="col-span-2 flex justify-center mt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-customBlue text-black rounded hover:bg-blue-700 transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
        {messageStatus.sent && <div className="text-green-500">Email sent successfully!</div>}
        {messageStatus.error && <div className="text-red-500">Failed to send email. Please try again later.</div>}
      </div>
    </footer>
  );
};

export default Footer;

