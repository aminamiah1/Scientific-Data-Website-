import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full  bg-gray-100 py-8 dark:bg-slate-600">
      <div className="max-w-screen-xl mx-auto px-10 md:px-32">
        <div className="flex justify-center items-center">
          <form className="relative container max-w-4xl bg-white bg-opacity-80 rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-xl">
            <div className="col-span-2">
              <h2 className="text-2xl font-bold text-center mb-6">Contact Us!</h2>
          </div>
            <div className="space-y-4">
              <input
                id="frm-name"
                type="text"
                name="name"
                autoComplete="given-name"
                required
                placeholder="Name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                id="frm-email"
                type="email"
                name="email"
                autoComplete="email"
                required
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                id="frm-phone"
                type="text"
                name="phone"
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
      </div>
    </footer>
  );
};

export default Footer;
