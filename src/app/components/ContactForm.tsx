import React, { useState } from "react";
import { IoMail, IoCall, IoPersonCircle, IoSend } from "react-icons/io5";

const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ name, email, phone, message });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <IoPersonCircle className="inline-block text-lg" />
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name*"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="ml-2"
        />
      </div>
      <div>
        <IoMail className="inline-block text-lg" />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email*"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="ml-2"
        />
      </div>
      <div>
        <IoCall className="inline-block text-lg" />
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Your Phone*"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
          className="ml-2"
        />
      </div>
      <div>
        <textarea
          id="message"
          name="message"
          placeholder="Your Message*"
          value={message}
          onChange={e => setMessage(e.target.value)}
          required
          className="mt-1 block w-full"
        ></textarea>
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <button type="submit" className="inline-flex items-center px-4 py-2">
        <IoSend className="mr-2" />
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;

