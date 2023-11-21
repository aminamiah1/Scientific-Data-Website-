// src/app/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="flex justify-center items-center w-full mt-8 bg-gray-50">
    <div className="w-full h-96 bg-contact-bg flex justify-center items-center">
        <form className="container max-w-4xl bg-transparent rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <input
            id="frm-name"
            type="text"
            name="name"
            autoComplete="given-name"
            required
            placeholder="Name"
            className="input-field"
          />
          <input
            id="frm-email"
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder="Email"
            className="input-field"
          />
          <input
            id="frm-phone"
            type="text"
            name="phone"
            autoComplete="tel"
            required
            placeholder="Phone"
            className="input-field"
          />
        </div>
        <div className="space-y-4">
          <textarea
            id="frm-message"
            name="message"
            placeholder="Message"
            className="textarea-field"
          ></textarea>
        </div>
        <div className="col-span-2 flex justify-center">
          <button
            type="submit"
            className="submit-button"
          >
            Send Message
          </button>
        </div>
      </form>
      </div>
    </footer>
  );
};

export default Footer;
